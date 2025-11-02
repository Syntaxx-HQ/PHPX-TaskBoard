# PHPX-TaskBoard Architecture & Implementation Guide

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER ENVIRONMENT                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ public/index.html                                          │ │
│  │ ├── <div id="root"></div>      ← Render target            │ │
│  │ ├── <div id="app"></div>       ← Loading spinner          │ │
│  │ └── <script> php-vrzno-web.mjs ← WASM runtime loader      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              ↓                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ WebAssembly Runtime (php-vrzno-web.wasm)                   │ │
│  │ ├── PHP 8.3 compiled to WASM                               │ │
│  │ ├── Virtual filesystem (/app/...)                          │ │
│  │ └── VRZNO bridge (direct DOM access)                       │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              ↓                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ bootstrap.php → main.php (compiled)                        │ │
│  │                                                              │ │
│  │ App() Component                                             │ │
│  │  ├─ TaskBoard Mode                                         │ │
│  │  │  └─ Board() [State Hub]                                │ │
│  │  │     ├─ Column("todo")     [addCard form]               │ │
│  │  │     │  ├─ Card × 3        [inline edit]                │ │
│  │  │     │  └─ AddCard Form                                 │ │
│  │  │     ├─ Column("in-progress")                           │ │
│  │  │     │  ├─ Card × 2                                     │ │
│  │  │     │  └─ AddCard Form                                 │ │
│  │  │     └─ Column("done")                                  │ │
│  │  │        ├─ Card × 2                                     │ │
│  │  │        └─ AddCard Form                                 │ │
│  │  └─ BenchmarkApp Mode                                      │ │
│  │     └─ 7 Performance Tests                                │ │
│  │                                                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              ↓                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ VRZNO Bridge (Direct DOM Manipulation)                     │ │
│  │                                                              │ │
│  │ $window = new Vrzno                                        │ │
│  │ $element->innerHTML = $html    ← Direct property access    │ │
│  │ $element->value = $data        ← Direct property access    │ │
│  │ vrzno_eval($jsCode)            ← Complex operations        │ │
│  │                                                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              ↓                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ JavaScript DOM Tree                                        │ │
│  │                                                              │ │
│  │ #root                                                       │ │
│  │  ├─ Header (toggle button)                                │ │
│  │  └─ Board Grid (3 columns)                                │ │
│  │     ├─ Column (todo)                                      │ │
│  │     │  ├─ Card                                            │ │
│  │     │  ├─ Card                                            │ │
│  │     │  └─ Form / "Add" button                             │ │
│  │     ├─ Column (in-progress)                               │ │
│  │     └─ Column (done)                                      │ │
│  │                                                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              ↓                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Rendered UI (CSS Styled)                                  │ │
│  │ • 3-column Kanban board                                   │ │
│  │ • Responsive design                                       │ │
│  │ • Interactive forms                                       │ │
│  │ • Drag-drop zones                                         │ │
│  │                                                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Build Pipeline

```
┌─────────────────────────────────────────────────────────┐
│ Development (Source Files)                              │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  src/main.phpx                                          │
│  src/App.phpx                                           │
│  src/Components/Board.phpx      ← PHPX syntax           │
│  src/Components/Column.phpx        (JSX in PHP)         │
│  src/Components/Card.phpx                               │
│  src/Components/BenchmarkApp.phpx                       │
│                                                           │
└──────────────────────┬──────────────────────────────────┘
                       ↓
           ┌───────────────────────┐
           │ PHPX Compiler         │
           │ (syntaxx/phpx-compiler)
           │                       │
           │ Converts:             │
           │ .phpx → .php          │
           │ JSX → PHP function    │
           │ calls                 │
           └───────────┬───────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│ Compiled PHP (src/ → build/)                            │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  build/main.php                                         │
│  build/App.php                                          │
│  build/Components/Board.php                             │
│  build/Components/Column.php                            │
│  build/Components/Card.php                              │
│  build/Components/BenchmarkApp.php                      │
│                                                           │
└──────────────────────┬──────────────────────────────────┘
                       ↓
           ┌───────────────────────┐
           │ PHPX Build Tools      │
           │ (--dev flag)          │
           │                       │
           │ • Vendor caching      │
           │ • WASM compilation    │
           │ • Source maps         │
           └───────────┬───────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│ WebAssembly Build                                       │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  docker buildx bake vrzno                               │
│  (PHP 8.3 → WASM)                                       │
│                                                           │
│  Output:                                                 │
│  ├── php-vrzno-web.wasm         ← WebAssembly binary    │
│  ├── php-vrzno-web.mjs          ← JS loader module      │
│  ├── php-web.data               ← Filesystem data       │
│  └── php-web.data.js            ← Data loader           │
│                                                           │
└──────────────────────┬──────────────────────────────────┘
                       ↓
           ┌───────────────────────┐
           │ WebAssembly Packer    │
           │ (syntaxx/webassembly- │
           │  packer)              │
           │                       │
           │ Bundles:              │
           │ • bootstrap.php       │
           │ • build/ files        │
           │ • vendor/             │
           │ → Single data file    │
           │ • LZ4 compression     │
           └───────────┬───────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│ Final Build Artifacts (public/build/)                   │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  public/build/php-vrzno-web.wasm                        │
│  public/build/php-vrzno-web.mjs                         │
│  public/build/php-web.data                              │
│  public/build/php-web.data.js                           │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## Component State Flow

```
User Action
   ↓
Event Handler (onClick, onChange, etc.)
   ↓
setState() call
   ↓
Component Re-render (JSX → PHP → HTML)
   ↓
Runtime.createComponent()
   ↓
VRZNO DOM Update
   ├─ Direct: $element->property = $value
   │  (Fast, but no partial updates)
   │
   └─ Eval: vrzno_eval("document.getElementById(...)")
      (Flexible, can handle complex ops)
   ↓
Browser Re-paint
   ↓
User sees updated UI
```

## Event Handling Pattern

```
User Input
   ↓
Browser Event (click, change, keypress)
   ↓
Event Listener (registered in Runtime)
   ↓
PHP Event Handler
   │
   ├─ Receives: Event object ($e)
   │  • $e->target
   │  • $e->target->value (for inputs)
   │  • $e->key (for keyboard)
   │  • $e->preventDefault()
   │  • $e->stopPropagation()
   │
   └─ Can call:
      • $setState() for reactive updates
      • DOM methods via VRZNO
      • Validation functions
      • Callbacks from props
   ↓
Component Re-renders
   ↓
UI Updates
```

## Data Flow in Forms (The Focus Problem)

```
Column Component
├─ State:
│  ├─ isAddingCard: bool
│  ├─ newCardTitle: string
│  ├─ newCardPriority: string ← THIS ONE CAUSES ISSUES
│  ├─ titleError: string
│  └─ isDragOver: bool
│
├─ Render:
│  ├─ Add button
│  └─ When isAddingCard:
│     ├─ <input>           ← Uncontrolled (reads from DOM)
│     ├─ <select>          ← Controlled (value={newCardPriority})
│     └─ <button>
│
└─ Problem Flow:
   1. User types in input → No state change → Focus OK
   2. User changes select → onChange fires
   3. $setNewCardPriority() called
   4. Component re-renders
   5. <select> gets new value attribute
   6. <input> re-renders with autoFocus attribute
   7. BUT: autoFocus happens AFTER select onchange completes
   8. Focus is lost because input DOM was recreated
   
Solution: Don't use controlled select, or defer focus restoration
```

## State Management Architecture

```
Board (Root State)
│
├─ cards: {
│  │  'todo': [Card, Card, Card],
│  │  'in-progress': [Card, Card],
│  │  'done': [Card, Card]
│  └─ }
│
├─ draggedCard: Card | null
├─ draggedFromColumn: string | null
│
└─ Operations:
   ├─ addCard(columnId, cardData)
   ├─ deleteCard(columnId, cardId)
   ├─ updateCard(columnId, cardId, updates)
   ├─ moveCard(fromColumn, toColumn, cardId)
   ├─ handleDragStart(card, columnId)
   ├─ handleDragEnd()
   └─ handleDrop(toColumn)
      
↓ (Passed as props to children)

Column (Local State)
│
├─ id: string
├─ title: string
├─ cards: Card[]
├─ isAddingCard: bool
├─ newCardTitle: string
├─ newCardPriority: string
├─ titleError: string
├─ isDragOver: bool
│
└─ Operations:
   ├─ handleAddCard()
   ├─ handleSaveCard()
   ├─ handleCancelCard()
   ├─ handleDragOver($event)
   ├─ handleDragLeave()
   └─ handleDropInColumn($event)

Card (Local State)
│
├─ card: {id, title, priority}
├─ isEditing: bool
├─ editTitle: string
├─ isModalOpen: bool        ← Disabled
├─ showDeleteConfirm: bool  ← Disabled
│
└─ Operations:
   ├─ handleTitleDoubleClick()
   ├─ handleSaveEdit()
   ├─ handleCancelEdit()
   └─ handleDeleteClick()
```

## Component Lifecycle

```
Component Initialization
   ↓
useState() calls
   ↓
Event Listeners Registered
   ↓
Component Renders (JSX → HTML)
   ↓
DOM Mounted
   ↓
                    ┌─────────────────────┐
                    │   Running State     │
                    ├─────────────────────┤
                    │ • Listening for     │
                    │   events            │
                    │ • State updates     │
                    │   via setState()    │
                    │ • Re-renders on     │
                    │   state change      │
                    └─────────────────────┘
                            ↓
                    User Action
                            ↓
                    Event Handler Called
                            ↓
                    setState() Triggered
                            ↓
                    Component Re-renders
                    (Back to "Running State")
```

## VRZNO Bridge Usage Patterns

```
PATTERN 1: Direct Property Access (FAST)
─────────────────────────────────────────
$element->innerHTML = $html;          ✓ Fast
$element->value = $data;              ✓ Fast
$element->className = $class;         ✓ Fast
$element->style->color = '#ff0000';   ✓ Fast

PATTERN 2: Complex Operations (Use eval)
──────────────────────────────────────────
vrzno_eval("document.getElementById('x').classList.add('active')");
vrzno_eval("const result = document.querySelector('input').value;");

PATTERN 3: Event Delegation (Automatic)
────────────────────────────────────────
$handleClick = fn($e) => { ... };
<element onClick={$handleClick}>

// Framework handles:
// 1. Register listener in JavaScript
// 2. Call PHP function on event
// 3. Pass event object
// 4. Return value back to JS

PATTERN 4: DOM Traversal (Both work)
────────────────────────────────────
Direct: $parent = $element->parentElement;
Eval: vrzno_eval("document.querySelector('#x').closest('.form')");
```

## Performance Considerations

```
Operation               Speed        Best Method
────────────────────────────────────────────────
Set innerHTML           4.36x        Direct VRZNO
Set property            6.8x         Direct VRZNO
Read property           0.72x        vrzno_eval
Add class               0.25x        vrzno_eval
Multiple updates        5x           Direct VRZNO
DOM traversal           0.5x         vrzno_eval
Event listener          0.3x         vrzno_eval

General Rule:
• Write operations: Use direct VRZNO access
• Read operations: Can use either
• Complex ops: Use vrzno_eval for clarity
```

## Testing Architecture

```
Playwright Test Suite
└─ Base URL: http://localhost:9901
   
   ├─ Test: board.spec.ts
   │  └─ 6 tests
   │     ├─ Application header displays
   │     ├─ 3 columns present
   │     ├─ Sample cards visible
   │     ├─ Add button in each column
   │     └─ Responsive on mobile
   │
   └─ Test: card-operations.spec.ts
      └─ 42+ tests
         ├─ Add card operations
         ├─ Delete card operations
         ├─ Edit card operations
         ├─ Priority changes
         ├─ Form validation
         ├─ Keyboard shortcuts
         └─ Drag-drop states

Test Pattern:
1. Load page (http://localhost:9901)
2. Wait for WASM to load (1-2s)
3. Query elements by data-testid
4. Simulate user actions
5. Assert expected results
```

## Compilation Flow

```
PHPX Source (.phpx)
│
├─ JSX Syntax Check
│  └─ PHP-X-Parser validates JSX
│
├─ PHPX Compilation
│  └─ PHPX-Compiler converts:
│     <Component prop={$value}>
│       {$statement}
│     </Component>
│     
│     ↓ to ↓
│     
│     Component(['prop' => $value, 'children' => function() {
│       return $statement;
│     }])
│
└─ PHP Output
   └─ Standard PHP that can be:
      • Executed normally
      • Compiled to WebAssembly
      • Analyzed by static tools
```

---

## Key Takeaways

1. **PHPX is JSX for PHP** - Use PHP syntax inside `{}`
2. **Runs in WebAssembly** - Compiles to WASM, not JavaScript
3. **VRZNO Bridge** - Direct JavaScript DOM access from PHP
4. **Full Re-render Model** - Like older React (no Virtual DOM)
5. **Event-Driven** - React-like event handling pattern
6. **State with Hooks** - useState for component state
7. **Component Composition** - Proper component hierarchy

---

**Document Version**: 1.0  
**Last Updated**: November 2, 2025  
**Status**: Complete Architecture Reference
