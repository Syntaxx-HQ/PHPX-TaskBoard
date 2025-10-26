<?php
declare (strict_types=1);
namespace TaskBoard\Components;

use Syntaxx\PHPX\Framework\Component;
use Syntaxx\PHPX\Framework\Runtime;
use TaskBoard\Components\Column;
use function Syntaxx\PHPX\Framework\useState;

function Board()
{
    // Initial sample data
    $initialCards = ['todo' => [['id' => 'card-1', 'title' => 'Setup project repository', 'priority' => 'high'], ['id' => 'card-2', 'title' => 'Create initial documentation', 'priority' => 'medium'], ['id' => 'card-3', 'title' => 'Design database schema', 'priority' => 'high']], 'in-progress' => [['id' => 'card-4', 'title' => 'Implement user authentication', 'priority' => 'high'], ['id' => 'card-5', 'title' => 'Setup CI/CD pipeline', 'priority' => 'medium']], 'done' => [['id' => 'card-6', 'title' => 'Initialize Next.js project', 'priority' => 'low'], ['id' => 'card-7', 'title' => 'Configure ESLint and Prettier', 'priority' => 'low']]];
    [$cards, $setCards] = useState($initialCards);
    [$draggedCard, $setDraggedCard] = useState(null);
    [$draggedFromColumn, $setDraggedFromColumn] = useState(null);
    // Add a new card to a column
    $addCard = fn($columnId, $cardData) => $setCards(fn($prev) => array_merge($prev, [$columnId => array_merge($prev[$columnId] ?? [], [array_merge($cardData, ['id' => 'card-' . uniqid()])])]));
    // Delete a card from a column
    $deleteCard = fn($columnId, $cardId) => $setCards(fn($prev) => array_merge($prev, [$columnId => array_filter($prev[$columnId] ?? [], fn($card) => $card['id'] !== $cardId)]));
    // Update a card in a column
    $updateCard = fn($columnId, $cardId, $updates) => $setCards(fn($prev) => array_merge($prev, [$columnId => array_map(fn($card) => $card['id'] === $cardId ? array_merge($card, $updates) : $card, $prev[$columnId] ?? [])]));
    // Move a card between columns
    $moveCard = fn($fromColumn, $toColumn, $cardId) => $setCards(fn($prev) => (function () use ($prev, $fromColumn, $toColumn, $cardId) {
        $card = null;
        foreach ($prev[$fromColumn] ?? [] as $c) {
            if ($c['id'] === $cardId) {
                $card = $c;
                break;
            }
        }
        if (!$card) {
            return $prev;
        }
        return array_merge($prev, [$fromColumn => array_filter($prev[$fromColumn] ?? [], fn($c) => $c['id'] !== $cardId), $toColumn => array_merge($prev[$toColumn] ?? [], [$card])]);
    })());
    // Handle drag start
    $handleDragStart = fn($card, $columnId) => $setDraggedCard($card) || $setDraggedFromColumn($columnId) || null;
    // Handle drag end
    $handleDragEnd = fn() => $setDraggedCard(null) || $setDraggedFromColumn(null) || null;
    // Handle drop
    $handleDrop = fn($toColumn) => $draggedCard && $draggedFromColumn && $draggedFromColumn !== $toColumn ? $moveCard($draggedFromColumn, $toColumn, $draggedCard['id']) : null;
    return Component::create("div", ["data-phpx-source" => "Board.phpx:90:1"], [Component::create("header", ["className" => "app-header", "data-testid" => "app-header", "data-phpx-source" => "Board.phpx:91:1"], [Component::create("h1", ["data-phpx-source" => "Board.phpx:92:1"], ["TaskBoard Pro"])]), Component::create("div", ["className" => "kanban-board", "data-testid" => "kanban-board", "data-phpx-source" => "Board.phpx:95:1"], [Component::create("Column", ["id" => "todo", "title" => "To Do", "cards" => $cards['todo'] ?? [], "onAddCard" => fn($cardData) => $addCard('todo', $cardData), "onDeleteCard" => fn($cardId) => $deleteCard('todo', $cardId), "onUpdateCard" => fn($cardId, $updates) => $updateCard('todo', $cardId, $updates), "onDragStart" => fn($card) => $handleDragStart($card, 'todo'), "onDragEnd" => $handleDragEnd, "onDrop" => fn() => $handleDrop('todo'), "data-phpx-source" => "Board.phpx:96:1"], []), Component::create("Column", ["id" => "in-progress", "title" => "In Progress", "cards" => $cards['in-progress'] ?? [], "onAddCard" => fn($cardData) => $addCard('in-progress', $cardData), "onDeleteCard" => fn($cardId) => $deleteCard('in-progress', $cardId), "onUpdateCard" => fn($cardId, $updates) => $updateCard('in-progress', $cardId, $updates), "onDragStart" => fn($card) => $handleDragStart($card, 'in-progress'), "onDragEnd" => $handleDragEnd, "onDrop" => fn() => $handleDrop('in-progress'), "data-phpx-source" => "Board.phpx:108:1"], []), Component::create("Column", ["id" => "done", "title" => "Done", "cards" => $cards['done'] ?? [], "onAddCard" => fn($cardData) => $addCard('done', $cardData), "onDeleteCard" => fn($cardId) => $deleteCard('done', $cardId), "onUpdateCard" => fn($cardId, $updates) => $updateCard('done', $cardId, $updates), "onDragStart" => fn($card) => $handleDragStart($card, 'done'), "onDragEnd" => $handleDragEnd, "onDrop" => fn() => $handleDrop('done'), "data-phpx-source" => "Board.phpx:120:1"], [])])]);
}