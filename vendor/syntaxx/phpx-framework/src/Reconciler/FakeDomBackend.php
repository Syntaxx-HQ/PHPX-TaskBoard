<?php

namespace Syntaxx\PHPX\Framework\Reconciler;

/**
 * An in-memory host node used only by {@see FakeDomBackend} for tests.
 *
 * Holds enough state to (a) assert the rendered tree via serialization and
 * (b) prove node identity is preserved across re-renders (the proxy for "the
 * real DOM node survived, so focus/caret survived").
 */
final class FakeNode
{
    public string $tag;
    public bool $isText;
    public string $text = '';
    /** @var array<string,mixed> */
    public array $props = [];
    /** @var FakeNode[] */
    public array $children = [];
    public ?FakeNode $parent = null;

    public function __construct(string $tag, bool $isText = false)
    {
        $this->tag = $tag;
        $this->isText = $isText;
    }

    /** Stable per-instance id, used in tests to assert node reuse vs recreation. */
    public function id(): int
    {
        return spl_object_id($this);
    }

    /** Serialize to a compact, deterministic HTML-ish string for assertions. */
    public function toHtml(): string
    {
        if ($this->isText) {
            return $this->text;
        }

        $attrs = '';
        ksort($this->props);
        foreach ($this->props as $k => $v) {
            if (strpos($k, 'on') === 0) {
                // Event handlers are not serialized as attributes.
                continue;
            }
            if ($k === 'dangerouslySetInnerHTML') {
                continue;
            }
            $attrs .= ' ' . $k . '="' . (is_scalar($v) ? (string) $v : '') . '"';
        }

        if (isset($this->props['dangerouslySetInnerHTML'])) {
            $raw = $this->props['dangerouslySetInnerHTML']['__html'] ?? '';
            return "<{$this->tag}{$attrs}>{$raw}</{$this->tag}>";
        }

        $inner = '';
        foreach ($this->children as $child) {
            $inner .= $child->toHtml();
        }

        return "<{$this->tag}{$attrs}>{$inner}</{$this->tag}>";
    }
}

/**
 * In-memory {@see HostConfig} for headless PHPUnit tests.
 *
 * Mirrors the mutation semantics of a real DOM (append / insertBefore / move /
 * remove and prop set/remove) without a browser, so the reconciler and commit
 * logic can be exercised and asserted fast. className→class mapping mirrors the
 * VRZNO backend so serialized output matches what ships.
 */
final class FakeDomBackend implements HostConfig
{
    /** Mutation log for assertions about minimal patching. */
    public array $log = [];

    public function createElement(string $type)
    {
        $this->log[] = "create:$type";
        return new FakeNode($type);
    }

    public function createTextNode(string $text)
    {
        $node = new FakeNode('#text', true);
        $node->text = $text;
        return $node;
    }

    public function setText($node, string $text): void
    {
        $this->log[] = "setText:{$text}";
        $node->text = $text;
    }

    public function setProp($node, string $key, $value, $prev = null): void
    {
        if (strpos($key, 'on') === 0) {
            $node->props[$key] = $value;
            return;
        }
        $attr = $key === 'className' ? 'class' : $key;
        $this->log[] = "setProp:{$attr}";
        $node->props[$attr] = $value;
    }

    public function removeProp($node, string $key, $prev = null): void
    {
        $attr = $key === 'className' ? 'class' : $key;
        $this->log[] = "removeProp:{$attr}";
        unset($node->props[$attr]);
    }

    public function appendChild($parent, $child): void
    {
        $this->detach($child);
        $child->parent = $parent;
        $parent->children[] = $child;
        $this->log[] = 'append';
    }

    public function insertBefore($parent, $child, $reference): void
    {
        if ($reference === null) {
            $this->appendChild($parent, $child);
            return;
        }
        $this->detach($child);
        $child->parent = $parent;
        $idx = array_search($reference, $parent->children, true);
        if ($idx === false) {
            $parent->children[] = $child;
        } else {
            array_splice($parent->children, $idx, 0, [$child]);
        }
        $this->log[] = 'insertBefore';
    }

    public function removeChild($parent, $child): void
    {
        $idx = array_search($child, $parent->children, true);
        if ($idx !== false) {
            array_splice($parent->children, $idx, 1);
        }
        $child->parent = null;
        $this->log[] = 'remove';
    }

    private function detach(FakeNode $child): void
    {
        if ($child->parent !== null) {
            $p = $child->parent;
            $idx = array_search($child, $p->children, true);
            if ($idx !== false) {
                array_splice($p->children, $idx, 1);
            }
            $child->parent = null;
        }
    }
}
