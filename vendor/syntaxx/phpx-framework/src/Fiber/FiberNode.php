<?php

namespace Syntaxx\PHPX\Framework\Fiber;

/**
 * A persistent unit of work / component-or-host instance.
 *
 * Unlike React's double-buffered fibers, these nodes persist in place across
 * renders. Persistence is what gives us the two properties we care about most:
 *   - host nodes ($stateNode) survive re-renders, so focus/caret/scroll survive;
 *   - hook state ($hooks) is attached to the instance, not to a function name,
 *     so two instances of the same component have independent state.
 *
 * Engine invariant: a fiber resolves to a *sequence* of host nodes
 * (collectHostNodes). Host/text fibers resolve to exactly one; component/root
 * fibers resolve to the concatenation of their children's host nodes
 * (so component pass-through and fragments work).
 */
final class FiberNode
{
    public const ROOT = '#root';

    public string $type;
    /** @var string|int|null */
    public $key = null;

    public bool $isRoot = false;
    public bool $isText = false;
    public bool $isComponent = false;
    /** When true the reconciler will not diff this host fiber's children
     *  after mount (used for contentEditable surfaces owned via a ref). */
    public bool $hostBoundary = false;

    /** @var array<string,mixed> */
    public array $props = [];
    public string $text = '';

    /** Host node handle (element/text), or the container for the root. Null for components. */
    public $stateNode = null;

    public ?FiberNode $parent = null;
    /** @var FiberNode[] */
    public array $children = [];

    /** Resolved component callable (component fibers only). */
    public $renderFn = null;

    /** Per-instance hook state (see HookManager). */
    public array $hooks = [];

    /** Transient: set when the host node was just created this pass (forces insertion). */
    public bool $isNew = false;
    /** Transient: this host/text fiber's previous index within its DOM parent's
     *  flattened child list, used for move detection. */
    public int $prevFlatIndex = -1;

    public function __construct(string $type)
    {
        $this->type = $type;
    }

    public function isHost(): bool
    {
        return !$this->isRoot && !$this->isText && !$this->isComponent;
    }

    /**
     * Flatten this fiber to the ordered list of real host nodes it owns,
     * descending through components/root (which have no host node of their own).
     *
     * @return array<int,mixed> host node handles
     */
    public function collectHostNodes(): array
    {
        if ($this->isText || $this->isHost()) {
            return $this->stateNode === null ? [] : [$this->stateNode];
        }

        $out = [];
        foreach ($this->children as $child) {
            foreach ($child->collectHostNodes() as $node) {
                $out[] = $node;
            }
        }
        return $out;
    }
}
