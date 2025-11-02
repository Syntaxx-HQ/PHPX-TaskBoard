# PHPX-TaskBoard - Comprehensive Project Exploration

This directory contains complete documentation of the PHPX-TaskBoard project structure, implementation, and status.

## Quick Navigation

### For Quick Overview
- **START HERE**: `QUICK_REFERENCE.md` - 1-page summary
- **Visual Guide**: `ARCHITECTURE.md` - System diagrams and flows
- **Full Analysis**: `EXPLORATION.md` - Complete 13-section breakdown

### For Development
- **Setup Instructions**: See `Quick Start Commands` in QUICK_REFERENCE.md
- **Implementation Details**: See Section 5 in EXPLORATION.md
- **Known Issues**: See `KNOWN ISSUES & LIMITATIONS` in EXPLORATION.md
- **Next Steps**: See `NEXT STEPS FOR DEVELOPMENT` in QUICK_REFERENCE.md

### For Understanding PHPX
- **Architecture Overview**: ARCHITECTURE.md - System flows, component hierarchy
- **Component Patterns**: Section 5 in EXPLORATION.md
- **Event Handling**: ARCHITECTURE.md - Event patterns and flows
- **State Management**: Section 8 in ARCHITECTURE.md

### Project Documentation (Already in Repo)
- `CLAUDE.md` - Development guidance
- `STATE.md` - Current state and issues
- `TaskBoardPHPX.md` - Original TDD plan
- `WHAT-I-DID-WRONG.md` - Debugging lessons

---

## Project Status Summary

| Category | Status | Details |
|----------|--------|---------|
| **Build System** | ✅ Working | PHPX → PHP → WASM compilation pipeline |
| **Basic Board** | ✅ Working | 3 columns, 7 sample cards, responsive design |
| **Card Operations** | ✅ Working | Add, delete, edit titles, change priority |
| **Forms** | ⚠️ Issues | Input focus lost on priority select change |
| **Drag-Drop** | ⚠️ Partial | State managed but visual feedback incomplete |
| **Test Suite** | ✅ 48 Tests | Playwright E2E tests, passing |
| **Modals** | ❌ Disabled | Code present but commented out |
| **Storage** | ❌ Missing | No localStorage persistence |

---

## File Structure Reference

```
src/
├── main.phpx                    # Entry point
├── App.phpx                     # App switcher component
└── Components/
    ├── Board.phpx              # State hub (card CRUD operations)
    ├── Column.phpx             # Column + add card form (⚠️ focus issues)
    ├── Card.phpx               # Card rendering + inline edit
    └── BenchmarkApp.phpx       # VRZNO performance benchmark

tests/e2e/
├── board.spec.ts               # Board display tests
└── card-operations.spec.ts      # Card operation tests (42+ tests)

public/
├── index.html                  # HTML entry point (CRITICAL: has #root)
└── build/                      # Compiled WASM artifacts

Configuration:
├── bootstrap.php               # WASM bootstrap
├── composer.json               # PHP dependencies (symlinked)
├── package.json                # npm scripts
└── playwright.config.ts        # Test configuration
```

---

## Key Implementation Details

### Components Implemented

1. **Board.phpx** - State management hub
   - Manages 3 columns (todo, in-progress, done)
   - Handles card CRUD operations
   - Provides drag-drop state management
   - Passes callbacks to child components

2. **Column.phpx** - Column container + add form
   - Displays column title and cards
   - Implements add card form
   - Form validation (required title)
   - Drag-over visual feedback
   - **Known Issue**: Priority select causes input focus loss

3. **Card.phpx** - Individual task card
   - Displays title and priority badge
   - Inline edit on double-click
   - Delete button
   - Draggable attributes
   - **Disabled Features**: Modal and delete confirmation (commented out)

4. **App.phpx** - Application switcher
   - Toggle between TaskBoard and BenchmarkApp
   - Simple conditional rendering

5. **BenchmarkApp.phpx** - Performance testing
   - 7 tests comparing Direct VRZNO vs vrzno_eval
   - Helps identify optimal DOM access patterns

### State Structure

**Board Level:**
```php
[
    'todo' => [Card, Card, ...],
    'in-progress' => [Card, Card],
    'done' => [Card, Card]
]
```

**Column Local State:**
- isAddingCard (bool)
- newCardTitle (string)
- newCardPriority (string)
- titleError (string)
- isDragOver (bool)

**Card Local State:**
- isEditing (bool)
- editTitle (string)
- isModalOpen (bool) - disabled
- showDeleteConfirm (bool) - disabled

---

## The Critical Focus Issue

### Problem
When typing in the "Add Card" form, focus is lost after each keystroke.

### Root Cause
1. Form has two controlled components: `<input>` and `<select>`
2. When select's priority changes via onChange → setState triggered
3. Component re-renders completely
4. Input DOM node is destroyed and recreated
5. Focus is lost because the original input element no longer exists

### Current Workaround
- Input is uncontrolled (no `value=` prop)
- Value is read directly from DOM when form is submitted
- Select is still controlled (causes the issue)

### Proper Solutions
1. **Virtual DOM** - Implement React-like reconciliation (major refactor)
2. **Framework Change** - Partial DOM updates instead of full replacement
3. **Component Split** - Separate input and select into different re-render cycles

---

## Build & Deployment

### Build Commands
```bash
# Development build with source maps
composer wasm:dev

# Watch mode (auto-rebuild)
composer wasm:watch

# Production build
composer wasm

# Development server
composer serve                  # localhost:9901
```

### Build Pipeline
```
.phpx source files
    ↓
PHPX Compiler (converts JSX to PHP)
    ↓
Compiled .php files
    ↓
PHPX Build Tools + PHP-WASM compiler
    ↓
WebAssembly binary + JavaScript loader
    ↓
public/build/ artifacts
    ↓
Browser loads and executes
```

---

## Testing

### Test Framework
- **Tool**: Playwright (TypeScript)
- **Tests**: 48 E2E tests
- **Coverage**: Board display, card operations, forms, keyboard shortcuts

### Running Tests
```bash
npm test                    # All tests
npm run test:headed        # With visible browser
npm run test:ui            # Test dashboard
npm run test:debug         # With debugger
```

### Test Pattern
1. Load http://localhost:9901
2. Wait for WASM initialization
3. Query by data-testid attributes
4. Simulate user interactions
5. Assert expected DOM state

---

## What Works vs What Doesn't

### Working Features
- Display 3-column board ✅
- Show sample cards ✅
- Add new cards ✅
- Delete cards ✅
- Edit card titles (inline) ✅
- Change card priority ✅
- Form validation ✅
- Responsive design ✅
- 48 automated tests ✅

### Known Issues
- **Input focus loss** - Framework limitation ⚠️
- **Drag-drop visual** - Incomplete feedback ⚠️
- **Card modals** - Disabled (code commented) ❌
- **Delete confirm** - Dialog disabled ❌
- **localStorage** - No persistence ❌
- **Touch support** - Not tested ❌

---

## Performance Benchmarks

The BenchmarkApp provides real performance data:

```
Operation               | Speed-up | Best Method
──────────────────────────────────────────────
innerHTML write         | 4.36x    | Direct VRZNO
Property write          | 6.8x     | Direct VRZNO
Multiple updates        | 5x       | Direct VRZNO
Property read           | 0.72x    | vrzno_eval
classList operations    | 0.25x    | vrzno_eval
DOM traversal           | 0.5x     | vrzno_eval
```

**Insight**: Use Direct VRZNO for DOM writes, vrzno_eval for reads/complex ops.

---

## Architecture Highlights

### Component Hierarchy
```
App
├── Board (state hub)
│   ├── Column("todo")
│   │   ├── Card × 3
│   │   └── AddCardForm
│   ├── Column("in-progress")
│   │   ├── Card × 2
│   │   └── AddCardForm
│   └── Column("done")
│       ├── Card × 2
│       └── AddCardForm
└── BenchmarkApp (optional)
```

### Event Flow
```
User action
  ↓
JavaScript event
  ↓
PHP event handler
  ↓
setState() call
  ↓
Component re-render
  ↓
VRZNO DOM update
  ↓
Browser re-paint
```

### VRZNO Bridge Patterns
- **Fast**: Direct property access (`$element->innerHTML = ...`)
- **Flexible**: JavaScript eval for complex operations
- **Automatic**: Event listener registration

---

## Development Workflow

### 1. Initial Setup
```bash
cd PHPX-TaskBoard
composer install
npm install
```

### 2. Development Loop
```bash
# Terminal 1: Build with watch
composer wasm:watch

# Terminal 2: Dev server
composer serve

# Terminal 3: Run tests
npm test
```

### 3. Making Changes
1. Edit `.phpx` source files
2. Watch rebuilds automatically
3. Refresh browser to see changes
4. Tests run automatically or on demand

### 4. Debugging
- Browser console shows PHP errors
- Playwright debugger for test issues
- Source maps available with `composer wasm:dev`

---

## Next Development Steps

### High Priority
1. **Fix Input Focus** (affects usability)
   - Requires Virtual DOM or framework changes
   - Major architectural change

### Medium Priority
2. **Enable Card Modals** (feature gap)
   - Uncomment Card.phpx lines 121-198
   - Debug render approach
   
3. **Add localStorage** (data persistence)
   - Save state on changes
   - Load on initialization

### Low Priority
4. **Complete Drag-Drop** (visual improvement)
   - State already manages card movement
   - Just needs visual feedback updates

5. **Mobile Touch Support** (testing needed)
   - Test existing drag-drop on mobile
   - Add touch-specific handlers if needed

6. **Rich Features** (future enhancements)
   - Card descriptions
   - Due dates
   - Labels/tags
   - Search/filter

---

## Key References

### In This Project
- `QUICK_REFERENCE.md` - 1-page summary
- `EXPLORATION.md` - 13-section deep dive
- `ARCHITECTURE.md` - System diagrams
- `CLAUDE.md` - Development guidance
- `STATE.md` - Current state
- `TaskBoardPHPX.md` - Original plan

### External References
- **PHPX Framework**: `/home/kambo/workspace/TEMP-holding/PHPX-Framework`
- **Tease Example** (working reference): `/home/kambo/workspace/TEMP-holding/PHPX-wasmstarter-phpx-tease`
- **Framework Documentation**: `vendor/syntaxx/phpx-framework/`

---

## Important Notes

### Critical Files to Understand
1. **src/Components/Column.phpx** - Where form focus issue occurs
2. **public/index.html** - Must have `<div id="root">` (CRITICAL)
3. **bootstrap.php** - WASM entry point
4. **composer.json** - Build configuration

### Don't Miss
- The focus issue is NOT a bug in your code - it's a framework limitation
- Modals are disabled due to the same issue
- Use uncontrolled components to work around the issue
- Reference the Tease example when stuck

### Performance Tips
- Use Direct VRZNO for DOM writes (faster)
- Use vrzno_eval for reads/complex operations
- Avoid unnecessary state updates
- Implement Virtual DOM for optimal performance

---

## Quick Facts

- **Type**: PHPX Kanban Board Application
- **Build**: PHPX → PHP → WebAssembly
- **Runtime**: PHP 8.3 compiled to WASM with VRZNO bridge
- **UI**: 3-column board with cards
- **Tests**: 48 E2E tests with Playwright
- **Status**: Functional prototype with known limitations
- **Suitable For**: PHPX testing, starter kit, reference implementation

---

## Questions & Answers

**Q: Can I run this locally?**
A: Yes! See "Quick Start Commands" in QUICK_REFERENCE.md

**Q: Why does the input lose focus?**
A: Framework limitation - innerHTML replacement destroys DOM nodes. See "The Critical Focus Issue" above.

**Q: Can I fix the focus issue?**
A: Yes, but it requires either a Virtual DOM implementation or framework-level changes.

**Q: How do I add new features?**
A: Edit `.phpx` files in src/, tests auto-rebuild, run tests with `npm test`.

**Q: Why are modals disabled?**
A: They had the same focus issue - code is still there, just commented out.

**Q: Is drag-drop working?**
A: Partially - state management is done, visual feedback is incomplete.

---

## Summary

PHPX-TaskBoard is a **working, feature-rich Kanban board** that demonstrates PHPX capabilities. It has a known focus issue that limits form usability, but otherwise functions well for viewing, adding, editing, and deleting tasks across three columns.

**Perfect for**: Learning PHPX, testing PHPX capabilities, understanding WebAssembly in PHP, using as a starter kit.

**Needs Work**: Virtual DOM implementation for better UX, localStorage persistence, mobile touch support.

**Status**: Stable, test-covered, well-documented, ready for feature development.

---

**Exploration Document Version**: 1.0  
**Last Updated**: November 2, 2025  
**Created By**: Claude Code Exploration Tool  
**Purpose**: Comprehensive project understanding and reference
