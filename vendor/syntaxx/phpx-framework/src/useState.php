<?php

namespace Syntaxx\PHPX\Framework;

use Syntaxx\PHPX\Framework\Hooks\HookManager;
use Syntaxx\PHPX\Framework\Hooks\Ref;

/**
 * Global hook functions, mirroring React. Each must be called during a
 * component's render and delegates to {@see HookManager}, which keeps hook
 * state on the rendering component's fiber instance (per-instance, not keyed by
 * function name as the old engine did).
 *
 * All hooks live in this single file because it is the one registered in the
 * framework's composer "files" autoload, so it loads reliably in every host —
 * including the WASM bundle.
 */

/**
 * React-style state hook. Backward-compatible signature: [$value, $setValue].
 */
function useState($initialValue): array
{
    return HookManager::useState($initialValue);
}

/**
 * Run a side effect after commit when $deps change (always on first mount).
 * $effect may return a cleanup callable, run before re-running and on unmount.
 *
 * @param array|null $deps null => run after every render
 */
function useEffect(callable $effect, ?array $deps = null): void
{
    HookManager::useEffect($effect, $deps);
}

/** Stable mutable container preserved across renders (e.g. to hold a DOM node). */
function useRef($initialValue = null): Ref
{
    return HookManager::useRef($initialValue);
}

/** Memoize a value; recomputed only when $deps change. */
function useMemo(callable $factory, array $deps)
{
    return HookManager::useMemo($factory, $deps);
}

/** Memoize a callback's identity across renders unless $deps change. */
function useCallback(callable $callback, array $deps): callable
{
    return HookManager::useCallback($callback, $deps);
}
