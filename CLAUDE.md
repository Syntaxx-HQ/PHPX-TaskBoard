# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PHPX-TaskBoard is a Trello-like Kanban board application built entirely with PHPX, serving as:
1. **Comprehensive test suite** for PHPX framework capabilities
2. **Real-world demonstration** of React-like components in PHP via WebAssembly
3. **Performance benchmark** for PHPX/WASM stack
4. **Starter kit** showing best practices for PHPX development

## Critical Rules

**PHPX must use WebAssembly at all costs - this is non-negotiable!**
- PHPX runs PHP compiled to WebAssembly in the browser
- PHPX syntax must be as similar to JSX as possible
- ALL code inside JSX expressions `{ }` MUST be valid PHP code

## Key Architecture Components

### VRZNO Bridge
PHPX uses VRZNO (PHP WebAssembly JavaScript interop) for DOM manipulation:
```php
// Direct object access - the whole point of VRZNO!
$window = new Vrzno;
$document = $window->document;
$root = $document->getElementById("app");
$root->innerHTML = '';  // Direct property assignment
$window->console->log("message");  // Direct method calls
```

**NEVER use vrzno_eval() obsessively** - VRZNO provides direct object access for most operations.

### React-like Component Pattern
```php
<?php
use Syntaxx\PHPX\Framework\Component;
use function Syntaxx\PHPX\Framework\useState;

function MyComponent($props) {
    [$count, $setCount] = useState(0);

    $handleClick = function() use ($count, $setCount) {
        $setCount($count + 1);
    };

    return (
        <div>
            <button onClick={$handleClick}>
                Count: {$count}
            </button>
        </div>
    );
}
```

### State Management
- Uses `useState` hooks similar to React
- State updates trigger re-renders
- Event handlers use PHP arrow functions: `fn()` or closures: `function() use (...)`

## Common Development Commands

```bash
# Install dependencies
composer install

# Build WebAssembly files
composer wasm                 # Production build
composer wasm:dev            # Development build with maps

# Watch mode for development
composer wasm:watch          # Rebuild on file changes

# Start development server
composer serve               # Serves on localhost:9901
# OR
php -S localhost:9901 -t public

# Run Playwright tests
npx playwright test
npx playwright test --headed  # With visible browser
npx playwright test --debug   # With debugger
```

## Project Structure

```
PHPX-TaskBoard/
├── src/
│   ├── main.phpx                 # Entry point
│   ├── App.phpx                  # Main app component
│   └── Components/
│       ├── Board.phpx            # Board container with state
│       ├── Column.phpx           # Kanban column
│       ├── Card.phpx             # Task card
│       └── BenchmarkApp.phpx     # VRZNO performance benchmark
├── public/
│   ├── index.html               # HTML entry (MUST have <div id="root"></div>)
│   └── build/                   # Compiled WebAssembly output
├── vendor/
│   └── syntaxx/phpx-framework/
│       └── src/Runtime.php      # Framework render logic
├── tests/
│   ├── test-add-card.js         # Playwright tests
│   ├── test-input-focus.js
│   └── test-double-click.js
├── bootstrap.php                # WASM bootstrap
└── composer.json
```

## Critical Implementation Details

### 1. Separate Root Element Required

The application **MUST** have a separate `<div id="root"></div>` element for rendering, distinct from the loading indicator:

```html
<!-- public/index.html -->
<body>
    <div id="root"></div>

    <div id="app">
        <div class="loading">Loading PHPX...</div>
    </div>

    <script type="module" src="/build/php-vrzno-web.mjs"></script>
</body>
```

This was **the critical fix** that made rendering work initially.

### 2. Event Handler Patterns

Event handlers receive the event object directly:

```php
// ✓ Correct
onClick={fn($e) => $e->preventDefault()}
onKeyPress={fn($e) => $e->key === 'Enter' ? $handleSave() : null}
onChange={fn($e) => $setNewCardPriority($e->target->value)}

// ✗ Wrong - don't pass props array
onClick={fn() => $handleClick($props)}
```

Event types are automatically extracted from prop names:
- `onClick` → `'click'` event
- `onChange` → `'change'` event
- `onKeyPress` → `'keypress'` event

### 3. Namespace Imports

**Always use correct PHPX namespaces:**

```php
// ✓ Correct
use Syntaxx\PHPX\Framework\Component;
use Syntaxx\PHPX\Framework\Runtime;
use Syntaxx\PHPX\Framework\Document;
use function Syntaxx\PHPX\Framework\useState;

// ✗ Wrong
use Syntaxx\Framework\Component;
use Syntaxx\Framework\Hooks\useState;
```

### 4. PHP Arrow Functions vs JavaScript

Inside JSX expressions, use PHP syntax:

```php
// ✓ Correct PHP arrow function
<button onClick={fn() => $setCount($count + 1)}>

// ✓ Correct PHP closure
<button onClick={function() use ($count, $setCount) {
    $setCount($count + 1);
}}>

// ✗ Wrong - JavaScript arrow function won't parse
<button onClick={() => $setCount($count + 1)}>
```

## Known Issues and Considerations

### Critical Issue: Input Focus Loss

**Problem**: When typing in input fields, focus is lost after the first character because the framework replaces entire innerHTML on every state change.

**Root Cause** (from Runtime.php:49):
```php
$jsCode = "document.getElementById('{$elementId}').innerHTML = {$escapedHtml};";
vrzno_eval($jsCode);
```

**Current Workarounds**:
1. Use uncontrolled inputs - read values directly from DOM when needed
2. Avoid state updates during typing
3. Use refs/IDs to restore focus after re-render (hacky)

**Location**: `/src/Components/Column.phpx` lines 126-182

**Future Solution**: Implement Virtual DOM with reconciliation (like React Fiber)

### Performance Considerations

- PHPX parsing adds ~20% overhead vs pure PHP
- WebAssembly runtime overhead for DOM operations
- Each state update triggers full innerHTML replacement
- Test with VRZNO benchmark: `BenchmarkApp.phpx`

**Benchmark Results** (VRZNO direct access vs vrzno_eval):
- Direct VRZNO wins 3/7 tests (innerHTML, property writes, multiple updates)
- vrzno_eval wins 4/7 tests (property reads, classList, DOM traversal)
- Use direct VRZNO for writes (4.36x faster), vrzno_eval for complex operations

## Debugging Methodology

### GOLDEN RULE: INSPECT → UNDERSTAND → FIX → TEST

**Never run tests on a broken application.** First understand what's broken.

### Phase 1: Console Inspection (ALWAYS FIRST)

```javascript
// inspect-console.js
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // ALWAYS SET UP THESE LISTENERS FIRST
    page.on('console', msg => {
        console.log(`[${msg.type()}] ${msg.text()}`);
    });

    page.on('pageerror', error => {
        console.log(`[PAGE ERROR] ${error.message}`);
    });

    await page.goto('http://localhost:9901');
    await page.waitForTimeout(2000);  // Let WASM load

    await browser.close();
})();
```

Run this **BEFORE any tests** - 90% of problems are visible in console.

### Phase 2: DOM State Check

```javascript
const appContent = await page.evaluate(() => {
    const root = document.getElementById('root');
    return {
        exists: !!root,
        innerHTML: root ? root.innerHTML.substring(0, 200) : 'Not found',
        childCount: root ? root.children.length : 0
    };
});
console.log('Root Element:', appContent);
```

### Phase 3: Compare with Working Example

When something works in `PHPX-wasmstarter-phpx-tease` but not here:

```bash
# Compare HTML structure
diff -u PHPX-wasmstarter-phpx-tease/public/index.html public/index.html

# Compare entry points
diff -u PHPX-wasmstarter-phpx-tease/src/main.phpx src/main.phpx

# Compare component patterns
diff -u PHPX-wasmstarter-phpx-tease/src/App.phpx src/App.phpx
```

### Common Error Patterns

**PHP/WASM Errors**:
```
Fatal error: Call to undefined function
Fatal error: Class not found
```
→ Check namespaces, imports, autoloading

**JavaScript Errors**:
```
TypeError: Cannot read property 'x' of undefined
```
→ Check initialization order, WASM loading completion

**DOM Issues**:
```
innerHTML: "<div class='loading'>...</div>"
childCount: 0
```
→ Check if render logic executed, verify element IDs

## Testing Strategy

### E2E Tests (Playwright)

Located in `tests/` directory:
- `test-add-card.js` - Test card creation
- `test-input-focus.js` - Test input focus behavior
- `test-double-click.js` - Test card editing

**Test Pattern**:
```javascript
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('http://localhost:9901');
    await page.waitForTimeout(2000);  // Wait for WASM

    // Test interactions
    await page.click('[data-testid="add-card-todo"]');
    await page.fill('[data-testid="card-title-input"]', 'New Task');
    await page.click('[data-testid="save-card-btn"]');

    await browser.close();
})();
```

### Key Test IDs

Use `data-testid` attributes for reliable element selection:
- `app-header` - App header
- `kanban-board` - Main board container
- `column-{id}` - Column elements (todo, in-progress, done)
- `add-card-{id}` - Add card buttons
- `card-title-input` - New card title input
- `card-priority-select` - Priority selector
- `save-card-btn` - Save card button
- `cancel-card-btn` - Cancel button

## State Management Patterns

### Board State Structure

```php
$initialCards = [
    'todo' => [
        ['id' => 'card-1', 'title' => 'Task title', 'priority' => 'high'],
        // ...
    ],
    'in-progress' => [...],
    'done' => [...]
];

[$cards, $setCards] = useState($initialCards);
```

### State Update Patterns

**Functional Updates** (recommended when new state depends on old):
```php
$setCards(fn($prev) => array_merge($prev, [
    $columnId => array_merge($prev[$columnId] ?? [], [$newCard])
]));
```

**Direct Updates**:
```php
$setCards($newCardsArray);
```

### Event Handler Patterns

**With closure capturing state**:
```php
$addCard = function($columnId, $cardData) use ($setCards) {
    $newCard = array_merge($cardData, ['id' => 'card-' . uniqid()]);
    $setCards(fn($prev) => array_merge($prev, [
        $columnId => array_merge($prev[$columnId] ?? [], [$newCard])
    ]));
};
```

**With arrow functions**:
```php
$deleteCard = fn($columnId, $cardId) => $setCards(fn($prev) => array_merge($prev, [
    $columnId => array_filter($prev[$columnId] ?? [], fn($card) => $card['id'] !== $cardId)
]));
```

## Component Communication

### Parent to Child (Props)

```php
// Board.phpx
<Column
    id="todo"
    title="To Do"
    cards={$cards['todo'] ?? []}
    onAddCard={fn($cardData) => $addCard('todo', $cardData)}
/>

// Column.phpx
function Column($props) {
    $id = $props['id'];
    $title = $props['title'];
    $cards = $props['cards'] ?? [];
    $onAddCard = $props['onAddCard'];
    // ...
}
```

### Child to Parent (Callbacks)

```php
// Parent defines callback
$onAddCard = fn($cardData) => $addCard('todo', $cardData);

// Child calls callback
$handleSave = function() use ($onAddCard) {
    $onAddCard(['title' => $title, 'priority' => $priority]);
};
```

## Key Files and Their Purposes

### Application Files

- **src/main.phpx**: Entry point, initializes app and renders to #root
- **src/App.phpx**: Main app component, toggle between TaskBoard and Benchmark
- **src/Components/Board.phpx**: Board state management, card operations
- **src/Components/Column.phpx**: Column rendering, add card form, drag/drop handlers
- **src/Components/Card.phpx**: Individual card rendering, edit/delete
- **src/Components/BenchmarkApp.phpx**: VRZNO performance benchmark (7 tests)

### Framework Files (Read-Only)

- **vendor/syntaxx/phpx-framework/src/Runtime.php**: Framework rendering logic, vrzno_eval usage
- **vendor/syntaxx/phpx-framework/src/useState.php**: State management hook

### Build Files

- **bootstrap.php**: WASM bootstrap logic
- **public/build/**: Compiled WebAssembly and JavaScript output

## Documentation Files

- **TaskBoardPHPX.md**: Original TDD plan and project spec
- **STATE.md**: Current application state and known issues
- **WHAT-I-DID-WRONG.md**: Debugging failure retrospective
- **PLAYWRIGHT-INSPECTION-METHODOLOGY.md**: Debugging methodology
- **CRITICAL-FAILURE-ANALYSIS.md**: Complete debugging failure analysis

**Read these files** to understand the project history, known issues, and debugging lessons learned.

## Common Pitfalls

### 1. Wrong Element ID
```php
// ✗ Wrong - will fail to render
$root = $document->getElementById("app");

// ✓ Correct - render target
$root = $document->getElementById("root");
```

### 2. Controlled Input Focus Loss
```php
// ✗ Wrong - loses focus on every keystroke
<input value={$value} onInput={fn($e) => setValue($e->target->value)} />

// ✓ Workaround - uncontrolled, read on submit
<input data-testid="my-input" />
$value = Document::document()->querySelector('[data-testid="my-input"]')->value;
```

### 3. JavaScript Syntax in JSX
```php
// ✗ Wrong - JavaScript arrow function
onClick={() => handleClick()}

// ✓ Correct - PHP arrow function
onClick={fn() => $handleClick()}
```

### 4. Missing Event Object
```php
// ✗ Wrong - handler expects event
onKeyPress={$handleKeyPress}  // Called with no args

// ✓ Correct - pass event
onKeyPress={fn($e) => $handleKeyPress($e)}
```

### 5. Namespace Imports
```php
// ✗ Wrong
use function Syntaxx\PHPX\Framework\useState;

// ✓ Correct - note the 'function' keyword
use function Syntaxx\PHPX\Framework\useState;
```

## Integration with PHPX Ecosystem

### Dependencies

- **PHPX-Framework**: Provides Component, Runtime, useState
- **PHPX-Compiler**: Compiles .phpx files to PHP
- **PHP-X-Parser**: Parses JSX syntax in PHP
- **PHPX-WasmRuntimeVrzno**: WebAssembly runtime with VRZNO bridge
- **WebAssemblyPacker**: Packs assets for WASM

### Build Pipeline

```
.phpx files → PHPX-Compiler → .php files → PHP-WASM → .wasm + .mjs
```

### Reference Projects

- **PHPX-wasmstarter-phpx-tease**: Fully functional starter (ALWAYS reference this)
- **PHPX-wasmstarter**: Basic starter without PHPX syntax
- **PHPX-Framework**: Framework source code

**When stuck, compare with tease project first!**

## Performance Targets

- **Initial Load**: < 2 seconds (including WASM initialization)
- **Card Add**: < 100ms
- **Card Delete**: < 100ms
- **Drag Start/Drop**: < 50ms
- **Memory Usage**: < 50MB for 100 cards

## Future Improvements

### Virtual DOM Implementation
Replace innerHTML replacement with intelligent DOM diffing:
- Track component tree
- Calculate minimal DOM changes
- Preserve focus and input state
- See React Fiber documentation for reference

### State Management Optimization
- Implement batch updates
- Debounce rapid state changes
- Selective component re-rendering

### Developer Experience
- Hot module replacement
- Better error messages
- Source maps for debugging

## When Things Break

### Checklist

1. ✓ Check browser console for errors (ALWAYS FIRST)
2. ✓ Verify WASM files loaded successfully
3. ✓ Check element IDs match (root vs app)
4. ✓ Verify namespace imports are correct
5. ✓ Compare with working tease example
6. ✓ Check event handler syntax (PHP, not JS)
7. ✓ Verify state updates are triggering re-renders

### Emergency Commands

```bash
# Rebuild everything
rm -rf build vendor
composer install
composer wasm

# Check if server is running
curl http://localhost:9901

# Inspect with Playwright
node tests/inspect-console.js
```

## Remember

1. **PHPX uses WebAssembly** - this is fundamental
2. **VRZNO provides direct object access** - don't overuse eval
3. **Console first, tests later** - inspect before you test
4. **Compare with working examples** - tease project is gold standard
5. **PHP syntax in JSX** - not JavaScript
6. **Focus loss is known issue** - use uncontrolled components
7. **Separate root element** - critical for rendering

## Getting Help

When asking for help:
1. Include console output (browser + terminal)
2. Show what you compared with tease project
3. Provide failing test output
4. Share relevant component code
5. Describe expected vs actual behavior

**Most importantly**: Check the documentation files (WHAT-I-DID-WRONG.md, etc.) for lessons learned from past debugging sessions.
