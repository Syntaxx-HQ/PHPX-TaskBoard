# PHPX-TaskBoard Quick Reference

## Project Status at a Glance

| Aspect | Status | Notes |
|--------|--------|-------|
| **Build** | ✅ Working | Compiles PHPX to WASM |
| **Rendering** | ✅ Working | Displays 3-column board |
| **Forms** | ⚠️ Partial | Input focus loss on priority change |
| **Drag-Drop** | ⚠️ Partial | State managed, visual incomplete |
| **Tests** | ✅ 48 tests | Playwright E2E tests passing |
| **Modals** | ❌ Disabled | Commented out (focus issues) |
| **Storage** | ❌ Missing | No localStorage persistence |

## File Map

```
src/                    → Source PHPX files
├── main.phpx          → Entry point (renders to #root)
├── App.phpx           → App switcher (TaskBoard/Benchmark)
└── Components/
    ├── Board.phpx     → State hub (CRUD operations)
    ├── Column.phpx    → Column + add card form (⚠️ focus issue)
    ├── Card.phpx      → Card rendering + inline edit
    └── BenchmarkApp.phpx → VRZNO performance tests

public/
├── index.html         → HTML entry (has <div id="root">)
└── build/             → Compiled WASM output

tests/e2e/             → 48 Playwright tests
```

## Essential Commands

```bash
# Build & Run
composer wasm:watch              # Auto-rebuild on changes
composer serve                   # Start dev server (localhost:9901)

# Testing
npm test                         # Run all 48 tests
npm run test:headed             # With visible browser
npm run test:ui                 # Test dashboard

# Development
composer install                # Install PHP deps
npm install                     # Install JS deps
```

## Component Hierarchy

```
App
├── TaskBoard
│   └── Board (state: 3 columns × N cards)
│       ├── Column ("To Do")
│       │   ├── Card × 3
│       │   └── Add Card Form
│       ├── Column ("In Progress")
│       │   ├── Card × 2
│       │   └── Add Card Form
│       └── Column ("Done")
│           ├── Card × 2
│           └── Add Card Form
└── BenchmarkApp (performance tests)
```

## State Structure

**Board State:**
```php
[
    'todo' => [
        ['id' => 'card-1', 'title' => '...', 'priority' => 'high'],
        // ...
    ],
    'in-progress' => [...],
    'done' => [...]
]
```

## What Works (Implemented)

✅ **Core Functionality**
- Board with 3 columns
- 7 sample cards
- Add card (title + priority)
- Delete card
- Edit card title (inline, double-click)
- Priority levels (High/Medium/Low with colors)
- Form validation

✅ **Infrastructure**
- PHPX → WASM compilation
- Component rendering
- Event handling
- State management (useState)
- Responsive design
- 48 E2E tests

## What Doesn't Work (Known Issues)

⚠️ **Critical Issues**
- **Input focus loss** - Typing loses focus after 1st character (Framework limitation)
  - Root cause: vrzno_eval replaces entire innerHTML on state change
  - Workaround: Use uncontrolled inputs, read from DOM

⚠️ **Feature Gaps**
- Card modals (commented out)
- Delete confirmation (disabled)
- Drag-drop visual completion (partial)
- localStorage persistence (not implemented)
- Touch/mobile support (untested)

## Key Files to Understand

1. **src/Components/Column.phpx** - Where focus issue occurs
2. **src/Components/Board.phpx** - State management hub
3. **public/index.html** - Must have `<div id="root">`
4. **CLAUDE.md** - Development guidance
5. **STATE.md** - Current issues & workarounds

## Critical Insights

**The Focus Problem:**
```php
// Column renders both input AND priority select
// When select changes → setState triggered
// Component re-renders → input DOM recreated
// Focus is lost because DOM node was destroyed

// Fix: Use uncontrolled components
// Read value from DOM when needed, not from state
```

**PHPX Architecture:**
- JSX in PHP (not JavaScript)
- Compiles to PHP
- PHP compiled to WebAssembly
- Runs in browser via VRZNO bridge
- Each state change = full component re-render

**VRZNO Bridge:**
- Direct DOM access: `$element->property = value`
- Faster for writes (innerHTML, properties)
- Use vrzno_eval for complex operations only

## Tests Overview

**48 Total Tests** (Playwright)
- Board display (6)
- Card operations (42+)
- Add, edit, delete operations
- Form validation
- Keyboard shortcuts (Enter, Escape)
- Priority changes
- Drag-drop states

## Next Steps for Development

1. **Fix Input Focus** (Priority: HIGH)
   - Requires Virtual DOM implementation
   - Or Framework-level change to partial updates

2. **Enable Modals** (Priority: MEDIUM)
   - Uncomment Card.phpx lines 121-198
   - Debug render approach

3. **Add localStorage** (Priority: MEDIUM)
   - Persist board state on changes
   - Load on initialization

4. **Complete Drag-Drop** (Priority: LOW)
   - Visual reordering already has state
   - Just needs visual feedback updates

5. **Mobile Support** (Priority: LOW)
   - Test touch events
   - Add mobile-friendly interactions

## Reference Links

- **PHPX Repository**: /home/kambo/workspace/TEMP-holding/PHPX-Framework
- **Tease Example**: /home/kambo/workspace/TEMP-holding/PHPX-wasmstarter-phpx-tease
- **Framework Source**: vendor/syntaxx/phpx-framework/src/

## Performance Targets

- Initial load: < 2 seconds
- Add card: < 100ms
- Delete card: < 100ms
- Memory: < 50MB for 100 cards

## Server Ports

- Dev Server: **localhost:9901** (see package.json)
- Build process: Uses WASM compiler internally

---

**Updated**: November 2, 2025  
**Status**: Functional prototype with known limitations  
**Suitable for**: PHPX testing, starter kit, feature development
