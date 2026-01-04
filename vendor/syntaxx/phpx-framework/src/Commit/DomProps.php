<?php

namespace Syntaxx\PHPX\Framework\Commit;

use Syntaxx\PHPX\Framework\Reconciler\HostConfig;

/**
 * Diffs two prop sets and applies only the changes to a host node through the
 * {@see HostConfig}. This is what makes updates surgical: unchanged attributes
 * are never touched, so the live node — and its focus/selection — is preserved.
 */
final class DomProps
{
    /** Props that are structural/meta and never written to the host as attributes. */
    private const RESERVED = ['children' => true, 'key' => true, 'ref' => true];

    /**
     * @param array<string,mixed> $oldProps
     * @param array<string,mixed> $newProps
     */
    public static function apply(HostConfig $host, $node, array $oldProps, array $newProps): void
    {
        // Remove props that disappeared.
        foreach ($oldProps as $key => $prev) {
            if (isset(self::RESERVED[$key])) {
                continue;
            }
            if (!array_key_exists($key, $newProps)) {
                $host->removeProp($node, $key, $prev);
            }
        }

        // Set new/changed props.
        foreach ($newProps as $key => $value) {
            if (isset(self::RESERVED[$key])) {
                continue;
            }
            $prev = $oldProps[$key] ?? null;

            // dangerouslySetInnerHTML arrives as a fresh ['__html' => ...] array
            // each render, so a plain !== would re-write innerHTML every time and
            // destroy the caret of an uncontrolled (contentEditable) subtree.
            // Compare by the inner HTML string and only write when it changed.
            if ($key === 'dangerouslySetInnerHTML') {
                $prevHtml = is_array($prev) ? ($prev['__html'] ?? null) : null;
                $newHtml = is_array($value) ? ($value['__html'] ?? null) : null;
                if ($prevHtml !== $newHtml) {
                    $host->setProp($node, $key, $value, $prev);
                }
                continue;
            }

            if (!array_key_exists($key, $oldProps) || $prev !== $value) {
                $host->setProp($node, $key, $value, $prev);
            }
        }
    }
}
