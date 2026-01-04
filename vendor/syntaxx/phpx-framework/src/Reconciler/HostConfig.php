<?php

namespace Syntaxx\PHPX\Framework\Reconciler;

/**
 * The set of host (DOM) operations the reconciler depends on.
 *
 * This is the seam that decouples the fiber engine from VRZNO. The browser
 * implementation ({@see \Syntaxx\PHPX\Framework\Reconciler\VrznoBackend})
 * drives real DOM nodes; the in-memory implementation
 * ({@see FakeDomBackend}) lets the reconciler/commit logic be unit-tested under
 * PHPUnit with no browser. The reconciler MUST only touch the host through this
 * interface — never call VRZNO directly.
 *
 * A "host node" handle is opaque to the engine: an object for VRZNO/Fake.
 */
interface HostConfig
{
    /** Create a host element of the given tag. */
    public function createElement(string $type);

    /** Create a host text node. */
    public function createTextNode(string $text);

    /** Update the text content of a text node. */
    public function setText($node, string $text): void;

    /**
     * Apply a single prop to an element. Implementations own the semantics of
     * special props (className→class, value, checked, style,
     * dangerouslySetInnerHTML, on*-event handlers).
     *
     * @param mixed $value    new value
     * @param mixed $prev     previous value (null on first set)
     */
    public function setProp($node, string $key, $value, $prev = null): void;

    /** Remove a previously-set prop from an element. */
    public function removeProp($node, string $key, $prev = null): void;

    /** Append $child as the last child of $parent. */
    public function appendChild($parent, $child): void;

    /**
     * Insert $child into $parent before $reference. When $reference is null,
     * this is equivalent to appendChild (insert at end).
     */
    public function insertBefore($parent, $child, $reference): void;

    /** Detach $child from $parent. */
    public function removeChild($parent, $child): void;
}
