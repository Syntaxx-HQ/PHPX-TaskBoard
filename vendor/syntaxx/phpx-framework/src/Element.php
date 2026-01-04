<?php

namespace Syntaxx\PHPX\Framework;

class Element {
    private $tagName;
    private $id;
    private $attributes = [];
    private $children = [];
    private $eventListeners = [];

    public function __construct(string $tagName, string $id) {
        $this->tagName = $tagName;
        $this->id = $id;
    }

    public function setAttribute(string $name, string $value): void {
        $this->attributes[$name] = $value;
    }

    public function addEventListener(string $event, callable $listener): void {
        if (!isset($this->eventListeners[$event])) {
            $this->eventListeners[$event] = [];
        }
        $this->eventListeners[$event][] = $listener;
    }

    public function appendChild($child): void {
        $this->children[] = $child;
    }

    public function toJavaScript(string $id): string {
        $js = "elements['{$id}'] = document.createElement('{$this->tagName}');\n";
        
        foreach ($this->attributes as $name => $value) {
            $js .= "elements['{$id}'].setAttribute('{$name}', '{$value}');\n";
        }

        foreach ($this->eventListeners as $event => $listeners) {
            foreach ($listeners as $index => $listener) {
                $js .= "elements['{$id}'].addEventListener('{$event}', function(e) {\n";
                $js .= "    // Call PHP event handler\n";
                $js .= "    fetch('/php-handler', {\n";
                $js .= "        method: 'POST',\n";
                $js .= "        body: JSON.stringify({\n";
                $js .= "            elementId: '{$id}',\n";
                $js .= "            event: '{$event}',\n";
                $js .= "            listenerIndex: {$index}\n";
                $js .= "        })\n";
                $js .= "    });\n";
                $js .= "});\n";
            }
        }

        foreach ($this->children as $child) {
            if ($child instanceof Element) {
                $js .= $child->toJavaScript($child->id) . "\n";
                $js .= "elements['{$id}'].appendChild(elements['{$child->id}']);\n";
            } elseif ($child instanceof TextNode) {
                $js .= "elements['{$id}'].appendChild(document.createTextNode('" . 
                    addslashes($child->getText()) . "'));\n";
            }
        }

        return $js;
    }
} 