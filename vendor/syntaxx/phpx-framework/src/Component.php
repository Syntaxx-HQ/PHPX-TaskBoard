<?php

namespace Syntaxx\PHPX\Framework;

class Component
{
    public $type;
    public $props;
    public $children;

    public function __construct(string $type, array $props = [], array $children = [])
    {
        $this->type = $type;
        $this->props = $props;
        $this->children = $children;
    }

    public static function create(string $type, array $props = [], array $children = []): self
    {
        return new self($type, $props, $children);
    }

    public function render(): string
    {
        $attributes = '';
        foreach ($this->props as $key => $value) {
            if (strpos($key, 'on') === 0) {
                // For event handlers, we'll handle them in Runtime
                continue;
            }
            $attributes .= " {$key}=\"{$value}\"";
        }

        $childrenHtml = '';
        foreach ($this->children as $child) {
            if ($child instanceof Component) {
                $childrenHtml .= $child->render();
            } else {
                $childrenHtml .= htmlspecialchars($child);
            }
        }

        return "<{$this->type}{$attributes}>{$childrenHtml}</{$this->type}>";
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function getProps(): array
    {
        return $this->props;
    }

    public function getChildren(): array
    {
        return $this->children;
    }
} 
