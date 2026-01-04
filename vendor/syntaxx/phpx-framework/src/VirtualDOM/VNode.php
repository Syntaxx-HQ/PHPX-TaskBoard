<?php

namespace Syntaxx\PHPX\Framework\VirtualDOM;

use Syntaxx\PHPX\Framework\Component;

/**
 * Canonical virtual-DOM node used internally by the reconciler.
 *
 * The public API (and the PHPX compiler) produces {@see Component} objects via
 * Component::create(). VNode::normalize() converts those — plus raw scalars,
 * arrays and nulls — into a flat, predictable node shape the fiber engine can
 * diff. Keeping this separate from Component preserves backward compatibility:
 * existing apps keep calling Component::create(), and we adapt at the boundary.
 *
 * Engine constraint (v1): every VNode resolves to exactly one host node (an
 * element or a text node). Components therefore render to a single root node.
 * Fragments / array returns are flattened where they appear in a children list.
 */
final class VNode
{
    public const TEXT = '#text';

    /** @var string Element tag, component name, or VNode::TEXT. */
    public string $type;

    /** @var array<string,mixed> */
    public array $props;

    /** @var VNode[] Already-normalized child nodes (used to render host elements). */
    public array $children;

    /**
     * The children exactly as authored (Component objects, scalars, arrays),
     * before normalization. Passed verbatim as $props['children'] to component
     * functions so introspection like `$child instanceof Component` keeps
     * working — this is required for backward compatibility with existing apps.
     *
     * @var array<int,mixed>
     */
    public array $rawChildren = [];

    /** @var string|int|null Stable identity hint for keyed reconciliation. */
    public $key;

    /** Text payload when $type === self::TEXT. */
    public string $text = '';

    /**
     * @param array<string,mixed> $props
     * @param VNode[]             $children
     */
    public function __construct(string $type, array $props = [], array $children = [], $key = null)
    {
        $this->type = $type;
        $this->props = $props;
        $this->children = $children;
        $this->key = $key;
    }

    public static function text(string $value): self
    {
        $node = new self(self::TEXT);
        $node->text = $value;
        return $node;
    }

    public function isText(): bool
    {
        return $this->type === self::TEXT;
    }

    /**
     * Normalize an arbitrary render result into a list of VNodes.
     *
     * Accepts: VNode, Component, scalar (string/int/float/bool), array (flattened
     * recursively), or null (dropped). This is the single funnel through which
     * all node shapes enter the engine.
     *
     * @return VNode[]
     */
    public static function normalizeChildren($input): array
    {
        if ($input === null || $input === false || $input === '') {
            return [];
        }

        if (is_array($input)) {
            $out = [];
            foreach ($input as $item) {
                foreach (self::normalizeChildren($item) as $node) {
                    $out[] = $node;
                }
            }
            return $out;
        }

        return [self::normalizeOne($input)];
    }

    /**
     * Normalize a single non-list value into one VNode.
     */
    public static function normalizeOne($input): self
    {
        if ($input instanceof self) {
            return $input;
        }

        if ($input instanceof Component) {
            $props = $input->props;
            $key = $props['key'] ?? null;
            unset($props['key']);

            $children = [];
            foreach ($input->children as $child) {
                foreach (self::normalizeChildren($child) as $node) {
                    $children[] = $node;
                }
            }

            $vnode = new self($input->type, $props, $children, $key);
            $vnode->rawChildren = $input->children;
            return $vnode;
        }

        // Scalars become text nodes.
        return self::text((string) $input);
    }
}
