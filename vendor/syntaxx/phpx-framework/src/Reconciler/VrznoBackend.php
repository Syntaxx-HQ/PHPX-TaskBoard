<?php

namespace Syntaxx\PHPX\Framework\Reconciler;

use Syntaxx\PHPX\Framework\Events\EventDelegator;

/**
 * Production {@see HostConfig}: drives the real browser DOM through VRZNO's
 * native object bridge (no innerHTML string-blasting, no vrzno_eval for normal
 * ops). Because the engine only ever mutates the specific nodes that changed,
 * live nodes — and their focus/caret — survive re-renders.
 *
 * Event props (on*) are not written as attributes; they are registered with the
 * {@see EventDelegator}, which keeps a single delegated listener per event type
 * on the root so handlers are never torn down on re-render.
 */
final class VrznoBackend implements HostConfig
{
    /** The VRZNO document object. */
    private $document;
    private EventDelegator $events;

    public function __construct($document, EventDelegator $events)
    {
        $this->document = $document;
        $this->events = $events;
    }

    public function createElement(string $type)
    {
        return $this->document->createElement($type);
    }

    public function createTextNode(string $text)
    {
        return $this->document->createTextNode($text);
    }

    public function setText($node, string $text): void
    {
        $node->textContent = $text;
    }

    public function setProp($node, string $key, $value, $prev = null): void
    {
        if (strncmp($key, 'on', 2) === 0 && ctype_upper($key[2] ?? 'x')) {
            // onClick -> click, onInput -> input, ...
            $eventType = strtolower(substr($key, 2));
            $this->events->bind($node, $eventType, $value);
            return;
        }

        switch ($key) {
            case 'className':
                $node->className = (string) $value;
                return;
            case 'value':
                // Only write when it actually differs from the live DOM value,
                // so we never disturb the caret of a focused input.
                if ($node->value !== $value) {
                    $node->value = $value;
                }
                return;
            case 'checked':
                $node->checked = (bool) $value;
                return;
            case 'style':
                $node->setAttribute('style', $this->styleToString($value));
                return;
            case 'dangerouslySetInnerHTML':
                $html = is_array($value) ? ($value['__html'] ?? '') : (string) $value;
                $node->innerHTML = $html;
                return;
        }

        if ($value === true) {
            $node->setAttribute($key, '');
        } elseif ($value === false || $value === null) {
            $node->removeAttribute($key);
        } else {
            $node->setAttribute($key, (string) $value);
        }
    }

    public function removeProp($node, string $key, $prev = null): void
    {
        if (strncmp($key, 'on', 2) === 0 && ctype_upper($key[2] ?? 'x')) {
            $eventType = strtolower(substr($key, 2));
            $this->events->unbind($node, $eventType);
            return;
        }

        switch ($key) {
            case 'className':
                $node->className = '';
                return;
            case 'value':
                $node->value = '';
                return;
            case 'checked':
                $node->checked = false;
                return;
        }

        $node->removeAttribute($key);
    }

    public function appendChild($parent, $child): void
    {
        $parent->appendChild($child);
    }

    public function insertBefore($parent, $child, $reference): void
    {
        if ($reference === null) {
            $parent->appendChild($child);
            return;
        }
        $parent->insertBefore($child, $reference);
    }

    public function removeChild($parent, $child): void
    {
        $parent->removeChild($child);
    }

    private function styleToString($style): string
    {
        if (is_string($style)) {
            return $style;
        }
        if (!is_array($style)) {
            return '';
        }
        $out = '';
        foreach ($style as $prop => $val) {
            // camelCase -> kebab-case (backgroundColor -> background-color)
            $kebab = strtolower(preg_replace('/([a-z])([A-Z])/', '$1-$2', $prop));
            $out .= $kebab . ':' . $val . ';';
        }
        return $out;
    }
}
