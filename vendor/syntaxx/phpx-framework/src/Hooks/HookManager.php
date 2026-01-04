<?php

namespace Syntaxx\PHPX\Framework\Hooks;

use Syntaxx\PHPX\Framework\Fiber\FiberNode;

/**
 * Implements React-style hooks with per-instance state.
 *
 * Hook state lives on the {@see FiberNode} (the component instance), indexed by
 * call order. This is the fix for the original engine's shared-state bug, where
 * state was keyed by component *function name* and therefore shared between all
 * instances of the same component.
 *
 * Rendering is synchronous and non-nested (a component's render fn fully returns
 * before any child component renders), but we keep a context stack for safety.
 */
final class HookManager
{
    /** @var array<int,array{fiber:FiberNode,scheduler:callable,index:int}> */
    private static array $stack = [];

    /** Effects queued during the current commit, flushed bottom-up afterwards. */
    private static array $pendingEffects = [];

    /**
     * Begin collecting hooks for $fiber. $scheduler is invoked (no args) when a
     * hook (e.g. setState) requests a re-render of the owning root.
     */
    public static function begin(FiberNode $fiber, callable $scheduler): void
    {
        self::$stack[] = ['fiber' => $fiber, 'scheduler' => $scheduler, 'index' => 0];
    }

    public static function end(): void
    {
        array_pop(self::$stack);
    }

    private static function ctx(): array
    {
        if (empty(self::$stack)) {
            throw new \RuntimeException('Hooks can only be called during component render.');
        }
        return self::$stack[count(self::$stack) - 1];
    }

    private static function &slot(): array
    {
        $top = count(self::$stack) - 1;
        if ($top < 0) {
            throw new \RuntimeException('Hooks can only be called during component render.');
        }
        $fiber = self::$stack[$top]['fiber'];
        $index = self::$stack[$top]['index']++;
        if (!array_key_exists($index, $fiber->hooks)) {
            $fiber->hooks[$index] = [];
        }
        return $fiber->hooks[$index];
    }

    public static function useState($initialValue): array
    {
        $top = count(self::$stack) - 1;
        $fiber = self::$stack[$top]['fiber'];
        $scheduler = self::$stack[$top]['scheduler'];
        $index = self::$stack[$top]['index']++;

        if (!array_key_exists($index, $fiber->hooks)) {
            $fiber->hooks[$index] = ['state' => is_callable($initialValue) ? $initialValue() : $initialValue];
        }

        $value = $fiber->hooks[$index]['state'];

        $setValue = static function ($newValue) use ($fiber, $index, $scheduler) {
            $current = $fiber->hooks[$index]['state'];
            if (is_callable($newValue)) {
                $newValue = $newValue($current);
            }
            if ($newValue === $current) {
                return; // bail out: no change, no re-render
            }
            $fiber->hooks[$index]['state'] = $newValue;
            $scheduler();
        };

        return [$value, $setValue];
    }

    public static function useRef($initialValue): Ref
    {
        $slot = &self::slot();
        if (!isset($slot['ref'])) {
            $slot['ref'] = new Ref($initialValue);
        }
        return $slot['ref'];
    }

    public static function useMemo(callable $factory, array $deps)
    {
        $slot = &self::slot();
        if (!array_key_exists('deps', $slot) || self::depsChanged($slot['deps'], $deps)) {
            $slot['deps'] = $deps;
            $slot['value'] = $factory();
        }
        return $slot['value'];
    }

    public static function useCallback(callable $callback, array $deps): callable
    {
        return self::useMemo(static fn () => $callback, $deps);
    }

    /**
     * Register an effect. The effect runs after commit when $deps change
     * (always on first mount). $effect may return a callable cleanup, run before
     * the next invocation and on unmount.
     *
     * @param array|null $deps null = run after every render
     */
    public static function useEffect(callable $effect, ?array $deps = null): void
    {
        $top = count(self::$stack) - 1;
        $fiber = self::$stack[$top]['fiber'];
        $index = self::$stack[$top]['index']++;

        $prev = $fiber->hooks[$index] ?? null;
        $shouldRun = $prev === null
            || $deps === null
            || self::depsChanged($prev['deps'] ?? null, $deps);

        $fiber->hooks[$index] = [
            'deps' => $deps,
            'cleanup' => $prev['cleanup'] ?? null,
            'effect' => $effect,
        ];

        if ($shouldRun) {
            self::$pendingEffects[] = $index === null ? null : ['fiber' => $fiber, 'index' => $index];
        }
    }

    private static function depsChanged(?array $oldDeps, ?array $newDeps): bool
    {
        if ($oldDeps === null || $newDeps === null) {
            return true;
        }
        if (count($oldDeps) !== count($newDeps)) {
            return true;
        }
        foreach ($newDeps as $i => $dep) {
            if (($oldDeps[$i] ?? null) !== $dep) {
                return true;
            }
        }
        return false;
    }

    /** Run queued effects bottom-up (children before parents), with cleanups. */
    public static function flushEffects(): void
    {
        $effects = self::$pendingEffects;
        self::$pendingEffects = [];
        // Children are queued after parents during render; reverse => bottom-up.
        foreach (array_reverse($effects) as $entry) {
            if ($entry === null) {
                continue;
            }
            $slot = &$entry['fiber']->hooks[$entry['index']];
            if (is_callable($slot['cleanup'] ?? null)) {
                ($slot['cleanup'])();
            }
            $cleanup = ($slot['effect'])();
            $slot['cleanup'] = is_callable($cleanup) ? $cleanup : null;
            unset($slot);
        }
    }

    /** Run all cleanups for a fiber being unmounted. */
    public static function runCleanups(FiberNode $fiber): void
    {
        foreach ($fiber->hooks as &$slot) {
            if (is_array($slot) && is_callable($slot['cleanup'] ?? null)) {
                ($slot['cleanup'])();
                $slot['cleanup'] = null;
            }
        }
        unset($slot);
        foreach ($fiber->children as $child) {
            self::runCleanups($child);
        }
    }

    public static function resetForTests(): void
    {
        self::$stack = [];
        self::$pendingEffects = [];
    }
}
