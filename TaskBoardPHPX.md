# TaskBoard Pro - PHPX Kanban Board Application

## 🎯 Project Overview

TaskBoard Pro is a Trello-like Kanban board application built entirely with PHPX, designed to serve as:
1. **Comprehensive test suite** for PHPX framework capabilities
2. **Starter kit** demonstrating best practices
3. **Real-world application** that developers can actually use
4. **Performance benchmark** for PHPX/WASM

## 🏗️ Architecture & Approach

### Core Principles
- **TDD First**: Write tests before implementation
- **Component-Driven**: Small, reusable, testable components
- **Progressive Enhancement**: Start simple, add complexity incrementally
- **State Management**: useState hooks with proper data flow
- **Type Safety**: Use PHP type hints everywhere possible
- **Performance Focus**: Monitor re-renders and memory usage

### Technology Stack
- **Frontend**: PHPX Components with JSX syntax
- **Runtime**: PHP-WASM with VRZNO bridge
- **Styling**: Tailwind CSS (via CDN initially)
- **Testing**: Playwright for E2E, PHPUnit for unit tests
- **Build**: PHPX-BuildTools with --dev and --create-html-maps
- **State**: useState hooks + localStorage persistence

## 📁 Project Structure

```
PHPX-TaskBoard/
├── src/
│   ├── main.php                 # Entry point
│   ├── App.php                  # Main app component
│   ├── components/
│   │   ├── Board.php            # Board container
│   │   ├── Column.php           # Kanban column
│   │   ├── Card.php             # Task card
│   │   ├── AddCard.php          # Add card form
│   │   ├── CardModal.php        # Card detail modal
│   │   ├── Header.php           # App header
│   │   └── ui/
│   │       ├── Button.php       # Reusable button
│   │       ├── Input.php        # Form input
│   │       ├── Badge.php        # Labels/tags
│   │       ├── Dropdown.php     # Dropdown menu
│   │       └── Modal.php        # Modal wrapper
│   ├── hooks/
│   │   ├── useLocalStorage.php  # LocalStorage hook
│   │   ├── useDragDrop.php      # Drag & drop logic
│   │   └── useKeyboard.php      # Keyboard shortcuts
│   ├── utils/
│   │   ├── storage.php          # LocalStorage helpers
│   │   ├── validators.php       # Form validation
│   │   └── formatters.php       # Date/text formatters
│   └── data/
│       └── initialData.php      # Sample board data
├── public/
│   ├── index.html               # HTML entry
│   ├── style.css                # Custom styles
│   └── build/                   # Compiled output
├── tests/
│   ├── unit/                    # PHPUnit tests
│   │   ├── CardTest.php
│   │   ├── ColumnTest.php
│   │   └── ValidatorsTest.php
│   └── e2e/                     # Playwright tests
│       ├── board.spec.ts        # Board operations
│       ├── drag-drop.spec.ts    # Drag & drop
│       ├── keyboard.spec.ts     # Shortcuts
│       └── persistence.spec.ts  # Data saving
├── bootstrap.php                # WASM bootstrap
├── composer.json
├── package.json
├── playwright.config.ts
├── tailwind.config.js
└── TaskBoardPHPX.md            # This document

```

## 🧪 Test-Driven Development Plan

### Phase 1: Core Components (Week 1)

#### Tests First:
```typescript
// tests/e2e/board.spec.ts
test('displays board with default columns', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-testid="column-todo"]')).toBeVisible();
  await expect(page.locator('[data-testid="column-in-progress"]')).toBeVisible();
  await expect(page.locator('[data-testid="column-done"]')).toBeVisible();
});

test('adds new card to column', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="add-card-todo"]');
  await page.fill('[data-testid="card-title-input"]', 'New Task');
  await page.click('[data-testid="save-card"]');
  await expect(page.locator('text=New Task')).toBeVisible();
});
```

#### Then Implementation:
1. **Board.php** - Container with three default columns
2. **Column.php** - Column with title and card list
3. **Card.php** - Basic card with title
4. **AddCard.php** - Simple form to add cards

### Phase 2: Drag & Drop (Week 2)

#### Tests First:
```typescript
// tests/e2e/drag-drop.spec.ts
test('drags card between columns', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('[data-testid="card-1"]');
  const targetColumn = page.locator('[data-testid="column-in-progress"]');

  await card.dragTo(targetColumn);

  await expect(targetColumn.locator('[data-testid="card-1"]')).toBeVisible();
});

test('reorders cards within column', async ({ page }) => {
  // Test card reordering
});
```

#### Then Implementation:
1. **useDragDrop.php** hook
2. Update Card.php with draggable attributes
3. Update Column.php with drop zones
4. State management for card positions

### Phase 3: Card Details (Week 3)

#### Tests First:
```typescript
// tests/e2e/card-modal.spec.ts
test('opens card modal on click', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="card-1"]');
  await expect(page.locator('[data-testid="card-modal"]')).toBeVisible();
});

test('edits card description', async ({ page }) => {
  // Test editing card details
});
```

#### Then Implementation:
1. **CardModal.php** component
2. **Modal.php** reusable wrapper
3. Rich text editing for descriptions
4. Due dates, labels, assignments

### Phase 4: Persistence (Week 4)

#### Tests First:
```typescript
// tests/e2e/persistence.spec.ts
test('persists board state to localStorage', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="add-card-todo"]');
  await page.fill('[data-testid="card-title-input"]', 'Persistent Task');
  await page.click('[data-testid="save-card"]');

  await page.reload();

  await expect(page.locator('text=Persistent Task')).toBeVisible();
});
```

#### Then Implementation:
1. **useLocalStorage.php** hook
2. Board state serialization
3. Auto-save functionality
4. Import/export features

## 🎨 Component Specifications

### Board Component
```php
<?php
use Syntaxx\PHPX\Framework\Component;

function Board($props) {
    [$columns, $setColumns] = useState([
        ['id' => 'todo', 'title' => 'To Do', 'cards' => []],
        ['id' => 'in-progress', 'title' => 'In Progress', 'cards' => []],
        ['id' => 'done', 'title' => 'Done', 'cards' => []]
    ]);

    $moveCard = fn($cardId, $fromColumn, $toColumn, $position) => {
        // Implementation
    };

    return (
        <div className="board-container flex gap-4 p-6">
            {array_map(fn($column) =>
                <Column
                    key={$column['id']}
                    column={$column}
                    onMoveCard={$moveCard}
                />,
            $columns)}
        </div>
    );
}
```

### Card Component with Drag
```php
function Card($props) {
    $handleDragStart = fn($e) => {
        $e->dataTransfer->setData('cardId', $props['card']['id']);
        $e->dataTransfer->setData('sourceColumn', $props['columnId']);
    };

    return (
        <div
            className="card bg-white p-3 rounded shadow mb-2 cursor-move"
            draggable="true"
            onDragStart={$handleDragStart}
            data-testid={"card-" . $props['card']['id']}
        >
            <h3>{$props['card']['title']}</h3>
            {$props['card']['labels'] &&
                <div className="flex gap-1 mt-2">
                    {array_map(fn($label) =>
                        <Badge color={$label['color']}>{$label['text']}</Badge>,
                    $props['card']['labels'])}
                </div>
            }
        </div>
    );
}
```

## 🚀 Implementation Phases

### MVP (Phase 1) - Basic Board
**Goal**: Working Kanban board with static columns
- [ ] Board with 3 columns
- [ ] Add cards to columns
- [ ] Delete cards
- [ ] Basic styling with Tailwind

**Success Metrics**:
- Can add/remove cards
- UI is responsive
- No console errors

### Phase 2 - Interactivity
**Goal**: Full drag-and-drop functionality
- [ ] Drag cards between columns
- [ ] Drag cards within columns
- [ ] Visual feedback during drag
- [ ] Touch support for mobile

**Success Metrics**:
- Smooth drag animations
- No cards lost during drag
- Works on mobile devices

### Phase 3 - Rich Features
**Goal**: Production-ready features
- [ ] Card detail modal
- [ ] Labels and colors
- [ ] Due dates
- [ ] Markdown descriptions
- [ ] Search and filter
- [ ] Keyboard shortcuts

**Success Metrics**:
- All features have tests
- Performance stays under 100ms response time
- Memory usage stable

### Phase 4 - Polish & Performance
**Goal**: Production quality
- [ ] Animations and transitions
- [ ] Dark mode
- [ ] Accessibility (ARIA labels)
- [ ] Performance optimization
- [ ] PWA capabilities
- [ ] Export/Import data

**Success Metrics**:
- Lighthouse score > 90
- Zero accessibility violations
- Works offline

## 🧪 Testing Strategy

### Unit Tests (PHPUnit)
- Test each component in isolation
- Test hooks return correct values
- Test utility functions
- Coverage target: 80%

### E2E Tests (Playwright)
- User journey tests
- Drag and drop operations
- Data persistence
- Keyboard navigation
- Coverage: All critical paths

### Performance Tests
- Monitor memory usage over time
- Test with 100+ cards
- Measure re-render frequency
- Track WASM heap usage

### Example Test Structure
```php
// tests/unit/CardTest.php
class CardTest extends TestCase {
    public function testRendersCardWithTitle() {
        $card = ['id' => 1, 'title' => 'Test Card'];
        $component = Card(['card' => $card, 'columnId' => 'todo']);

        $this->assertStringContainsString('Test Card', $component);
    }

    public function testRendersLabels() {
        // Test label rendering
    }
}
```

## 📊 State Management

### Board State Structure
```php
[
    'columns' => [
        [
            'id' => 'todo',
            'title' => 'To Do',
            'cards' => [
                [
                    'id' => 'card-1',
                    'title' => 'Implement drag and drop',
                    'description' => 'Add drag functionality...',
                    'labels' => [
                        ['text' => 'Feature', 'color' => 'blue']
                    ],
                    'dueDate' => '2024-11-01',
                    'assignee' => null,
                    'position' => 0
                ]
            ]
        ]
    ],
    'nextCardId' => 2,
    'filter' => '',
    'view' => 'board' // 'board' | 'list'
]
```

### State Updates
- All state updates through reducers
- Optimistic updates with rollback
- Debounced saves to localStorage
- Undo/redo stack

## 🎯 Performance Targets

- **Initial Load**: < 1 second
- **Card Drag Start**: < 50ms
- **Card Drop**: < 100ms
- **Add Card**: < 100ms
- **Open Modal**: < 50ms
- **Memory Usage**: < 50MB for 100 cards
- **Bundle Size**: < 500KB (excluding WASM runtime)

## 🐛 Known Challenges to Test

1. **Drag & Drop in WASM**: Event handling through VRZNO bridge
2. **localStorage in WASM**: Need to proxy through JavaScript
3. **Performance**: Many DOM updates during drag
4. **Memory**: Card data accumulation
5. **Touch Events**: Mobile drag support
6. **Keyboard Navigation**: Focus management

## 📈 Success Metrics

1. **Works as Daily Driver**: Can actually use for project management
2. **Performance**: Smooth even with 100+ cards
3. **Reliability**: No data loss, proper error handling
4. **Developer Experience**: Easy to extend and modify
5. **Test Coverage**: > 80% code coverage
6. **Documentation**: Every component documented

## 🚦 Development Workflow

1. **Write failing E2E test** for feature
2. **Write unit tests** for components
3. **Implement minimum code** to pass tests
4. **Refactor** for clarity and performance
5. **Document** the component/feature
6. **Benchmark** performance impact
7. **Commit** with descriptive message

## 📝 Next Steps

1. **Review this document** for completeness
2. **Set up project structure** with all directories
3. **Initialize with composer/npm** dependencies
4. **Write first E2E test** for board display
5. **Implement Board component** to pass test
6. **Continue TDD cycle** for each feature

---

Ready to start building? Let's create a robust, well-tested Kanban board that showcases PHPX capabilities! 🚀