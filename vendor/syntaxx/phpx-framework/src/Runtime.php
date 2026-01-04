<?php

namespace Syntaxx\PHPX\Framework;

use Syntaxx\PHPX\Framework\Commit\SelectionManager;
use Syntaxx\PHPX\Framework\Events\EventDelegator;
use Syntaxx\PHPX\Framework\Hooks\HookManager;
use Syntaxx\PHPX\Framework\Reconciler\ComponentResolver;
use Syntaxx\PHPX\Framework\Reconciler\Reconciler;
use Syntaxx\PHPX\Framework\Reconciler\VrznoBackend;

/**
 * Public entry point and backward-compatible facade over the fiber engine.
 *
 * The historical surface is preserved exactly so existing apps run unchanged:
 *   - Runtime::createRoot($node)->render($component)
 *   - Runtime::registerComponent($name, $callable)
 *   - Runtime::useState($initial)  and the global useState() function
 *
 * Internally this now wires a {@see Reconciler} backed by {@see VrznoBackend}
 * with delegated events and focus/caret preservation — instead of the old
 * innerHTML re-render loop. The big behavioural win: re-renders mutate only the
 * DOM that changed, so input focus and caret survive (the historical pain).
 */
class Runtime
{
    private Reconciler $reconciler;

    /** Kept for back-compat: previously the global current root. */
    private static ?Runtime $currentRoot = null;

    private function __construct($containerElement)
    {
        $window = new \Vrzno();
        $document = $window->document;

        // Clear any pre-render placeholder content in the container once, like
        // ReactDOM.createRoot does. After this the fiber engine owns the subtree
        // and never wipes it wholesale again.
        $containerElement->innerHTML = '';

        $events = new EventDelegator($containerElement);
        $backend = new VrznoBackend($document, $events);
        $this->reconciler = new Reconciler($backend, $containerElement);

        $selection = new SelectionManager($window);
        $this->reconciler->setCommitHooks(
            static function () use ($selection) {
                $selection->save();
            },
            static function () use ($selection) {
                $selection->restore();
            }
        );
    }

    /**
     * @param mixed $containerElement a VRZNO DOM element (e.g. #root)
     */
    public static function createRoot($containerElement): self
    {
        self::$currentRoot = new self($containerElement);
        $GLOBALS['__PHPX_ROOT__'] = self::$currentRoot;
        return self::$currentRoot;
    }

    /** Mount or update the given element tree into the root. */
    public function render($component): void
    {
        $GLOBALS['__PHPX_COMPONENT__'] = $component;
        $this->reconciler->render($component);
    }

    /** Register a named component (resolved before namespace/global lookup). */
    public static function registerComponent(string $name, callable $component): void
    {
        ComponentResolver::register($name, $component);
    }

    /** Back-compat static hook entry points; delegate to the per-instance HookManager. */
    public static function useState($initialValue): array
    {
        return HookManager::useState($initialValue);
    }
}
