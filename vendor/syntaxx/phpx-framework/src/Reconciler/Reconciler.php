<?php

namespace Syntaxx\PHPX\Framework\Reconciler;

use Syntaxx\PHPX\Framework\Commit\DomProps;
use Syntaxx\PHPX\Framework\Fiber\FiberNode;
use Syntaxx\PHPX\Framework\Hooks\HookManager;
use Syntaxx\PHPX\Framework\Hooks\Ref;
use Syntaxx\PHPX\Framework\VirtualDOM\VNode;

/**
 * The persistent-fiber reconciler: it diffs a freshly-rendered VNode tree
 * against the live fiber tree and applies the minimal set of host mutations
 * through a {@see HostConfig}.
 *
 * Design (see /home/kambo/.claude/plans/twinkly-herding-crab.md):
 *   - Fibers persist across renders, so host nodes and hook state survive.
 *   - Each render rebuilds the subtree (build phase: create/update nodes,
 *     reconcile children, append within fresh subtrees), then a placement pass
 *     per host parent inserts/moves only the nodes whose flattened position
 *     changed. Unchanged nodes are never touched -> focus/caret preserved.
 *   - Components have no host node; their produced nodes are flattened into the
 *     nearest host ancestor, so placement is owned solely by host/root fibers.
 *
 * Rendering is synchronous; a SelectionManager (browser only) wraps commits to
 * save/restore focus and caret around the mutation phase as a safety net.
 */
final class Reconciler
{
    private HostConfig $host;
    /** The host container node the root renders into. */
    private $container;
    private ?FiberNode $rootFiber = null;
    private ?VNode $element = null;

    /** Re-entrancy / batching guards. */
    private bool $rendering = false;
    private bool $dirty = false;

    /** Optional hook invoked around the mutation phase (focus/caret preservation). */
    private $beforeCommit = null;
    private $afterCommit = null;

    public function __construct(HostConfig $host, $container)
    {
        $this->host = $host;
        $this->container = $container;
    }

    /** Browser backends register selection save/restore around commits. */
    public function setCommitHooks(?callable $before, ?callable $after): void
    {
        $this->beforeCommit = $before;
        $this->afterCommit = $after;
    }

    public function getHost(): HostConfig
    {
        return $this->host;
    }

    /** Mount or update the tree from the given top-level element. */
    public function render($element): void
    {
        $this->element = VNode::normalizeOne($element);
        $this->performWork();
    }

    /** Schedule a re-render (called by setState). Synchronous with re-entrancy guard. */
    public function scheduleUpdate(): void
    {
        if ($this->element === null) {
            return;
        }
        if ($this->rendering) {
            $this->dirty = true; // a render triggered another update; run once more after
            return;
        }
        $this->performWork();
    }

    private function performWork(): void
    {
        if ($this->rootFiber === null) {
            $this->rootFiber = new FiberNode(FiberNode::ROOT);
            $this->rootFiber->isRoot = true;
            $this->rootFiber->stateNode = $this->container;
        }

        $this->rendering = true;
        if (is_callable($this->beforeCommit)) {
            ($this->beforeCommit)();
        }

        $this->reconcileChildren($this->rootFiber, [$this->element], $this->container);
        $this->placeChildren($this->rootFiber, $this->container);

        if (is_callable($this->afterCommit)) {
            ($this->afterCommit)();
        }
        HookManager::flushEffects();
        $this->rendering = false;

        if ($this->dirty) {
            $this->dirty = false;
            $this->performWork();
        }
    }

    /**
     * Diff $parentFiber's children against $newVnodes, update fiber.children,
     * delete dropped nodes from $hostParent, and recursively build each child.
     * Placement (insert/move) is NOT done here — see placeChildren().
     *
     * @param VNode[] $newVnodes
     */
    private function reconcileChildren(FiberNode $parentFiber, array $newVnodes, $hostParent): void
    {
        $old = $parentFiber->children;

        // Index reusable old fibers: keyed by explicit key, plus an ordered pool
        // of keyless fibers for positional reuse.
        $keyed = [];
        $keylessPool = [];
        foreach ($old as $fiber) {
            if ($fiber->key !== null) {
                $keyed[$fiber->key] = $fiber;
            } else {
                $keylessPool[] = $fiber;
            }
        }

        $newChildren = [];
        $used = [];
        foreach ($newVnodes as $vnode) {
            $match = null;
            if ($vnode->key !== null) {
                $cand = $keyed[$vnode->key] ?? null;
                if ($cand !== null && $this->typeMatches($cand, $vnode)) {
                    $match = $cand;
                    unset($keyed[$vnode->key]);
                }
            } else {
                foreach ($keylessPool as $i => $cand) {
                    if ($this->typeMatches($cand, $vnode)) {
                        $match = $cand;
                        unset($keylessPool[$i]);
                        break;
                    }
                }
            }

            if ($match === null) {
                $match = $this->createFiber($vnode);
                $match->isNew = true; // host node (if any) created during build
            }
            $match->parent = $parentFiber;
            $match->key = $vnode->key;
            $newChildren[] = $match;
            $used[spl_object_id($match)] = true;
        }

        // Delete old fibers not reused.
        foreach ($old as $fiber) {
            if (!isset($used[spl_object_id($fiber)])) {
                HookManager::runCleanups($fiber);
                foreach ($fiber->collectHostNodes() as $node) {
                    $this->host->removeChild($hostParent, $node);
                }
            }
        }

        $parentFiber->children = $newChildren;

        // Build each child subtree (no placement into $hostParent yet).
        foreach ($newChildren as $i => $childFiber) {
            $this->buildSubtree($childFiber, $newVnodes[$i], $hostParent);
        }
    }

    private function typeMatches(FiberNode $fiber, VNode $vnode): bool
    {
        if ($vnode->isText()) {
            return $fiber->isText;
        }
        return !$fiber->isText && $fiber->type === $vnode->type;
    }

    private function createFiber(VNode $vnode): FiberNode
    {
        if ($vnode->isText()) {
            $fiber = new FiberNode(VNode::TEXT);
            $fiber->isText = true;
            return $fiber;
        }

        $fiber = new FiberNode($vnode->type);
        $callable = ComponentResolver::resolve($vnode->type);
        if ($callable !== null) {
            $fiber->isComponent = true;
            $fiber->renderFn = $callable;
        }
        return $fiber;
    }

    /**
     * Create/update the fiber's own host node and recurse into its children.
     * For component fibers, children are reconciled against the same $hostParent
     * (pass-through), so their produced nodes land in the nearest host ancestor.
     */
    private function buildSubtree(FiberNode $fiber, VNode $vnode, $hostParent): void
    {
        if ($fiber->isText) {
            if ($fiber->stateNode === null) {
                $fiber->stateNode = $this->host->createTextNode($vnode->text);
            } elseif ($fiber->text !== $vnode->text) {
                $this->host->setText($fiber->stateNode, $vnode->text);
            }
            $fiber->text = $vnode->text;
            return;
        }

        if ($fiber->isComponent) {
            $self = $this;
            HookManager::begin($fiber, static function () use ($self) {
                $self->scheduleUpdate();
            });
            try {
                $props = $vnode->props;
                // Pass children as authored (Component objects/scalars) so apps
                // that introspect them (e.g. `$child instanceof Component`) work.
                $props['children'] = $vnode->rawChildren;
                $result = ($fiber->renderFn)($props);
            } finally {
                HookManager::end();
            }
            $fiber->props = $vnode->props;
            $this->reconcileChildren($fiber, VNode::normalizeChildren($result), $hostParent);
            return;
        }

        // Host element.
        $oldProps = $fiber->props;
        if ($fiber->stateNode === null) {
            $fiber->stateNode = $this->host->createElement($fiber->type);
            $oldProps = [];
        }
        DomProps::apply($this->host, $fiber->stateNode, $oldProps, $vnode->props);
        $fiber->props = $vnode->props;

        // Wire up ref to the live node.
        $ref = $vnode->props['ref'] ?? null;
        if ($ref instanceof Ref) {
            $ref->current = $fiber->stateNode;
        }

        // dangerouslySetInnerHTML marks an uncontrolled subtree (e.g. a
        // contentEditable surface): the reconciler does not diff its children;
        // the owning component manages the inner DOM via its ref.
        $fiber->hostBoundary = array_key_exists('dangerouslySetInnerHTML', $vnode->props);
        if ($fiber->hostBoundary) {
            $fiber->children = [];
            return;
        }

        $this->reconcileChildren($fiber, $vnode->children, $fiber->stateNode);
        $this->placeChildren($fiber, $fiber->stateNode);
    }

    /**
     * Insert/move only the host nodes whose position within $hostParent's
     * flattened child list changed. Right-to-left so each insertion's reference
     * (the next sibling node) is already finalized.
     */
    private function placeChildren(FiberNode $ownerFiber, $hostParent): void
    {
        $flat = [];
        $this->flattenHostChildren($ownerFiber, $flat);

        // Decide which entries must be (re)inserted: new nodes, or reused nodes
        // whose previous flat index regressed below the high-water mark (moved).
        $needsInsert = [];
        $lastPlaced = -1;
        foreach ($flat as $i => $fiber) {
            if ($fiber->isNew) {
                $needsInsert[$i] = true;
            } elseif ($fiber->prevFlatIndex < $lastPlaced) {
                $needsInsert[$i] = true;
            } else {
                $lastPlaced = $fiber->prevFlatIndex;
            }
        }

        $reference = null;
        for ($i = count($flat) - 1; $i >= 0; $i--) {
            $fiber = $flat[$i];
            if (!empty($needsInsert[$i])) {
                $this->host->insertBefore($hostParent, $fiber->stateNode, $reference);
            }
            $reference = $fiber->stateNode;
        }

        foreach ($flat as $i => $fiber) {
            $fiber->prevFlatIndex = $i;
            $fiber->isNew = false;
        }
    }

    /**
     * Collect the host/text fibers that are DOM children of $fiber, descending
     * through component/root fibers (which contribute no host node of their own)
     * but stopping at host/text fibers (their nodes are nested, not siblings).
     *
     * @param FiberNode[] $out
     */
    private function flattenHostChildren(FiberNode $fiber, array &$out): void
    {
        foreach ($fiber->children as $child) {
            if ($child->isText || $child->isHost()) {
                $out[] = $child;
            } else {
                $this->flattenHostChildren($child, $out);
            }
        }
    }
}
