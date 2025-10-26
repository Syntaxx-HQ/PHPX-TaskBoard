# PHPX TaskBoard - Current State

## Date: 2025-10-18

## Summary
The PHPX TaskBoard application is now rendering correctly and basic functionality works, but there's a critical issue with input focus loss due to how the PHPX framework handles DOM updates.

## Working Features
✅ **Application Rendering**: Fixed by adding separate `<div id="root"></div>` in index.html
✅ **Event Handlers**: Fixed to pass event object instead of props array
✅ **Add Card**: Works but with focus issues
✅ **Delete Card**: Works with confirmation dialog
✅ **Edit Card**: Basic inline editing works
✅ **Card Priority**: Can be set and displayed
✅ **State Management**: useState hooks work correctly

## Critical Issue: Input Focus Loss

### Problem
When typing in the input field, focus is lost after the first character. This happens because:

1. **Framework uses `vrzno_eval`** to execute JavaScript that replaces entire innerHTML:
   ```php
   // Runtime.php line 49
   $jsCode = "document.getElementById('{$elementId}').innerHTML = {$escapedHtml};";
   vrzno_eval($jsCode);
   ```

2. **No Virtual DOM**: The framework doesn't have React-like reconciliation. It destroys and recreates the entire DOM tree on every state change.

3. **Any state change triggers full re-render**: Even unrelated state updates (like the priority select's onChange) cause the input to lose focus.

### Current Workaround Attempt
Changed from controlled input to uncontrolled:
- Removed `value={$newCardTitle}` prop
- Removed `onInput` handler
- Read input value directly from DOM when saving
- Still loses focus because priority select's `onChange` triggers re-render

### Code Location
- **Input handling**: `/src/Components/Column.phpx` lines 126-132
- **Save handler**: `/src/Components/Column.phpx` lines 32-67
- **Framework render**: `/vendor/syntaxx/phpx-framework/src/Runtime.php` lines 40-53

## File Structure
```
/home/kambo/workspace/Syntaxx/PHPX-TaskBoard/
├── public/
│   └── index.html (has separate <div id="root"></div>)
├── src/
│   ├── main.phpx (entry point)
│   └── Components/
│       ├── App.phpx
│       ├── Board.phpx
│       ├── Column.phpx (input focus issue here)
│       └── Card.phpx
├── vendor/syntaxx/phpx-framework/
│   └── src/Runtime.php (vrzno_eval DOM replacement)
└── tests/
    ├── test-add-card.js (passes but with manual wait)
    ├── test-input-focus.js (shows focus loss)
    └── test-double-click.js
```

## Key Discoveries

### 1. Separate Root Div Required
The app wouldn't render until we added a separate `<div id="root"></div>` element, distinct from the loading div. This was the critical fix that made rendering work.

### 2. Event System
- Events use `addEventListener` with handler IDs
- Handler mappings stored in Runtime::$handlerMappings
- Event type extracted from prop name (onClick → click)
- Event object properly passed to handlers

### 3. VRZNO Bridge
- PHP WebAssembly uses VRZNO to interact with JavaScript DOM
- `vrzno_eval()` executes JavaScript code
- Document access via `Document::document()`
- DOM manipulation is synchronous

## Next Steps Options

### Option 1: Remove ALL controlled components
- Make priority select uncontrolled too
- Read all form values from DOM when needed
- Avoid any state updates during typing

### Option 2: Implement incremental DOM updates
- Modify Runtime.php to update specific elements
- Keep track of which elements changed
- More complex but better UX

### Option 3: Defer state updates
- Batch updates after user stops typing
- Use debouncing/throttling
- Still has UX issues

### Option 4: Use refs/IDs to restore focus
- After re-render, find input by ID and restore focus
- Set cursor position
- Hacky but might work

## Test Commands
```bash
# Build and watch
composer wasm:watch

# Test add card
node test-add-card.js

# Test input focus (currently fails)
node test-input-focus.js

# Test double-click
node test-double-click.js
```

## Important Notes
- **DO NOT** modify the framework's vrzno_eval approach without understanding WebAssembly implications
- **DO NOT** use onInput for controlled components - causes immediate focus loss
- **ALWAYS** test with actual browser, not just unit tests
- The tease example works differently - need to investigate why

## User Feedback History
- "THIS IS WRONG APPROACH! now I lost focus after each character!!!"
- User emphasized multiple times to reference the working tease example
- User fixed the rendering issue themselves (separate root div)
- User wants proper fix, not workarounds