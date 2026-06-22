# PHPX TaskBoard

A Trello-style Kanban board built entirely with PHPX, running in the browser as
WebAssembly. It's a real-world demonstration (and test bed) of the PHPX
reconciler: state updates patch only the DOM nodes that changed, so input focus
and the editing caret survive re-renders — the thing a full innerHTML-replacement
runtime cannot do.

## Features

- **Kanban columns** — To Do / In Progress / Done.
- **Cards** with a priority badge (low / medium / high).
- **Add and delete cards**, with a delete-confirmation dialog.
- **Inline title editing** — double-click a card title to edit it in place
  (focus and caret are preserved while you type).
- **Card detail modal** — click a card to open it; edit priority and description.
- **Drag and drop** cards between columns.
- **Reconciler** — surgical DOM patching; no focus loss on state changes.

## Prerequisites

- PHP 8.4 or higher
- Composer
- Node.js 18+ (for the Playwright test suite)
- A modern browser with WebAssembly support

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Syntaxx-HQ/PHPX-TaskBoard.git
cd PHPX-TaskBoard
```

2. Install dependencies:
```bash
composer install
npm install
```

3. Build the WebAssembly bundle:
```bash
composer wasm
```

## Development

Start the development server:

```bash
composer serve
```

This serves the board at `http://localhost:9001`.

## Project Structure

```
PHPX-TaskBoard/
├── bootstrap.php             # WASM bootstrap (loaded by the browser runtime)
├── public/
│   ├── index.html            # HTML entry (contains <div id="root">)
│   └── build/                # Compiled WebAssembly output (gitignored)
├── src/
│   ├── main.phpx             # Entry point: mounts the app to #root
│   ├── App.phpx              # Top-level app (TaskBoard / benchmark toggle)
│   └── Components/
│       ├── Board.phpx        # Board state + card operations
│       ├── Column.phpx       # Column + add-card form + drag/drop
│       └── Card.phpx         # Card: inline edit, modal, delete-confirm
├── tests/e2e/                # Playwright tests
├── .github/workflows/        # CI
├── composer.json
└── package.json
```

## Available Scripts

- `composer wasm` — full production build (compile + pack + export)
- `composer wasm:dev` — development build with source maps
- `composer wasm:watch` — watch mode (auto-rebuild on file changes)
- `composer serve` — start the dev server at `http://localhost:9001`
- `npm test` — run the Playwright end-to-end suite

## Testing

End-to-end tests (Playwright) cover the board, card operations (add, delete,
inline edit, modal), and drag-and-drop. The Playwright config starts its own
server, so you only need a build:

```bash
composer wasm        # ensure public/build is up to date
npm test
```

## How It Works

```
1. PHPX components (JSX-in-PHP) are compiled to plain PHP and packed into a
   WebAssembly data bundle.
2. The browser boots the PHP-WASM runtime; main.phpx mounts the board to #root.
3. Card/column interactions update component state via hooks; the reconciler
   diffs the tree and patches only the affected DOM nodes — so an
   inline edit keeps its caret across re-renders.
4. DOM access (drag events, selection) goes through the Vrzno JavaScript bridge.
```

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file
for details.

## Acknowledgments

Built on the [PHPX Framework](https://github.com/Syntaxx-HQ/PHPX-Framework) and the
PHP-to-WebAssembly runtime with the Vrzno DOM bridge.
