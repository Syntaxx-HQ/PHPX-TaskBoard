<?php

namespace Syntaxx\PHPX\Framework\Hooks;

/**
 * A stable mutable container returned by useRef(). Its identity is preserved
 * across renders so it can hold a reference to a live host node (e.g. the
 * contentEditable surface) or any mutable value that must not trigger renders.
 */
final class Ref
{
    /** @var mixed */
    public $current;

    public function __construct($initial = null)
    {
        $this->current = $initial;
    }
}
