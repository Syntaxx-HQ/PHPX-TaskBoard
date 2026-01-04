<?php

namespace Syntaxx\PHPX\Framework\Commit;

/**
 * Saves and restores focus and caret/selection around a commit.
 *
 * Surgical patching already preserves focus in the common case (the focused
 * node is never recreated). This is the safety net for the cases where the
 * focused node still gets moved by a reordering: we re-focus the same live node
 * and restore its caret afterwards. Handles two caret models:
 *   - <input>/<textarea>: selectionStart/selectionEnd
 *   - contentEditable: a window.getSelection() Range (anchor/focus node+offset)
 *
 * When a component deliberately rewrites its own contentEditable content (a new
 * dangerouslySetInnerHTML), the saved nodes are stale; the editor component is
 * then responsible for restoring its own caret from its model.
 */
final class SelectionManager
{
    /** VRZNO window object. */
    private $window;
    /** VRZNO document object. */
    private $document;
    /** @var array|null */
    private $saved = null;

    public function __construct($window)
    {
        $this->window = $window;
        $this->document = $window->document;
    }

    public function save(): void
    {
        $this->saved = null;
        $active = $this->document->activeElement;
        if ($active === null) {
            return;
        }

        $tag = strtolower((string) ($active->tagName ?? ''));
        if ($tag === 'input' || $tag === 'textarea') {
            $this->saved = [
                'kind' => 'input',
                'node' => $active,
                'start' => $active->selectionStart,
                'end' => $active->selectionEnd,
            ];
            return;
        }

        if ((bool) ($active->isContentEditable ?? false)) {
            $sel = $this->window->getSelection();
            if ($sel !== null && (int) ($sel->rangeCount ?? 0) > 0) {
                $this->saved = [
                    'kind' => 'ce',
                    'node' => $active,
                    'anchorNode' => $sel->anchorNode,
                    'anchorOffset' => $sel->anchorOffset,
                    'focusNode' => $sel->focusNode,
                    'focusOffset' => $sel->focusOffset,
                ];
            } else {
                $this->saved = ['kind' => 'focus', 'node' => $active];
            }
        }
    }

    public function restore(): void
    {
        if ($this->saved === null) {
            return;
        }
        $s = $this->saved;
        $this->saved = null;

        $node = $s['node'];
        if (!(bool) ($node->isConnected ?? true)) {
            return;
        }

        $node->focus();

        if ($s['kind'] === 'input') {
            if ($s['start'] !== null) {
                $node->setSelectionRange($s['start'], $s['end']);
            }
            return;
        }

        if ($s['kind'] === 'ce') {
            try {
                $sel = $this->window->getSelection();
                if ($sel !== null) {
                    $sel->setBaseAndExtent(
                        $s['anchorNode'],
                        $s['anchorOffset'],
                        $s['focusNode'],
                        $s['focusOffset']
                    );
                }
            } catch (\Throwable $e) {
                // Stale range (content was rewritten); editor restores its own caret.
            }
        }
    }
}
