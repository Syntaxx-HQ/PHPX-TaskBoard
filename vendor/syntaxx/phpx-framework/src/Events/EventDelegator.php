<?php

namespace Syntaxx\PHPX\Framework\Events;

/**
 * Delegated event system. Instead of attaching/detaching listeners on every
 * node each render (the old model, which tore handlers down and lost bindings),
 * this attaches exactly one listener per event type to the root container and
 * dispatches by walking up from event.target to the nearest node carrying a
 * registered handler id. Handlers therefore survive re-renders untouched.
 */
final class EventDelegator
{
    /** The root container VRZNO node. */
    private $root;
    private static int $idSeq = 0;

    /** @var array<string,array<string,callable>> handlers[phpxId][eventType] = callable */
    private array $handlers = [];
    /** @var array<string,bool> event types that already have a root listener */
    private array $rootListeners = [];

    public function __construct($root)
    {
        $this->root = $root;
    }

    /** Register a handler for ($node, $eventType), wiring a root listener once. */
    public function bind($node, string $eventType, callable $handler): void
    {
        $id = $this->ensureId($node);
        $this->handlers[$id][$eventType] = $handler;
        $this->ensureRootListener($eventType);
    }

    public function unbind($node, string $eventType): void
    {
        $id = $this->idOf($node);
        if ($id !== null) {
            unset($this->handlers[$id][$eventType]);
        }
    }

    private function ensureId($node): string
    {
        $id = $this->idOf($node);
        if ($id === null || $id === '') {
            $id = 'h' . (self::$idSeq++);
            $node->setAttribute('data-phpx-id', $id);
        }
        return $id;
    }

    private function idOf($node): ?string
    {
        $id = $node->getAttribute('data-phpx-id');
        return ($id === null || $id === '') ? null : $id;
    }

    private function ensureRootListener(string $eventType): void
    {
        if (isset($this->rootListeners[$eventType])) {
            return;
        }
        $this->rootListeners[$eventType] = true;
        $self = $this;
        $this->root->addEventListener($eventType, static function ($event) use ($self, $eventType) {
            $self->dispatch($eventType, $event);
        });
    }

    /** Walk up from the event target to find and invoke the nearest handler. */
    private function dispatch(string $eventType, $event): void
    {
        $target = $event->target;
        while ($target !== null) {
            $id = null;
            // Text nodes have no getAttribute; guard defensively.
            if (method_exists($target, 'getAttribute') || isset($target->getAttribute)) {
                $id = @$target->getAttribute('data-phpx-id');
            }
            if ($id !== null && $id !== '' && isset($this->handlers[$id][$eventType])) {
                try {
                    ($this->handlers[$id][$eventType])($event);
                } catch (\Throwable $e) {
                    error_log('[phpx] event handler error: ' . $e->getMessage());
                }
                return;
            }
            $target = $target->parentElement ?? null;
        }
    }
}
