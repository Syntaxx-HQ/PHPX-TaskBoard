<?php
use Syntaxx\PHPX\Framework\Component;
use Syntaxx\PHPX\Framework\Runtime;
function Column($props)
{
    $id = $props['id'];
    $title = $props['title'];
    $cards = $props['cards'] ?? [];
    $onAddCard = $props['onAddCard'];
    $onDeleteCard = $props['onDeleteCard'];
    $onUpdateCard = $props['onUpdateCard'];
    $onDragStart = $props['onDragStart'] ?? fn() => null;
    $onDragEnd = $props['onDragEnd'] ?? fn() => null;
    $onDrop = $props['onDrop'] ?? fn() => null;
    [$isAddingCard, $setIsAddingCard] = useState(false);
    [$newCardTitle, $setNewCardTitle] = useState('');
    [$newCardPriority, $setNewCardPriority] = useState('medium');
    [$titleError, $setTitleError] = useState('');
    [$isDragOver, $setIsDragOver] = useState(false);
    // Handle adding a new card
    $handleAddCard = fn() => $setIsAddingCard(true) || $setNewCardTitle('') || $setNewCardPriority('medium') || $setTitleError('') || null;
    // Handle saving a new card
    $handleSaveCard = fn() => (function () use ($newCardTitle, $newCardPriority, $setTitleError, $onAddCard, $setIsAddingCard, $setNewCardTitle) {
        $title = trim($newCardTitle);
        if (empty($title)) {
            $setTitleError('Title is required');
            return;
        }
        $onAddCard(['title' => $title, 'priority' => $newCardPriority]);
        $setIsAddingCard(false);
        $setNewCardTitle('');
        $setTitleError('');
    })();
    // Handle canceling add card
    $handleCancelCard = fn() => $setIsAddingCard(false) || $setNewCardTitle('') || $setTitleError('') || null;
    // Handle drag over
    $handleDragOver = fn($event) => $event->preventDefault() || $setIsDragOver(true) || null;
    // Handle drag leave
    $handleDragLeave = fn() => $setIsDragOver(false);
    // Handle drop
    $handleDropInColumn = fn($event) => $event->preventDefault() || $setIsDragOver(false) || $onDrop() || null;
    // Column test ID for different columns
    $columnTestId = "column-" . $id;
    $addButtonTestId = "add-card-" . $id;
    return Component::create("div", ["className" => $isDragOver ? "column drag-over" : "column", "data-testid" => $columnTestId, "onDragOver" => $handleDragOver, "onDragLeave" => $handleDragLeave, "onDrop" => $handleDropInColumn], [Component::create("h2", [], [$title]), Component::create("div", ["className" => "cards-container"], [array_map(fn($card) => Component::create("Card", ["key" => $card['id'], "card" => $card, "onDelete" => fn() => $onDeleteCard($card['id']), "onUpdate" => fn($updates) => $onUpdateCard($card['id'], $updates), "onDragStart" => fn() => $onDragStart($card), "onDragEnd" => $onDragEnd], []), $cards)]), $isAddingCard ? Component::create("div", ["className" => "new-card-form", "data-testid" => "new-card-form"], [Component::create("div", ["className" => "form-group"], [Component::create("input", ["type" => "text", "placeholder" => "Enter card title...", "value" => $newCardTitle, "onChange" => fn($e) => $setNewCardTitle($e->target->value), "onKeyPress" => fn($e) => $e->key === 'Enter' ? $handleSaveCard() : null, "data-testid" => "card-title-input", "autoFocus" => true], []), $titleError ? Component::create("div", ["className" => "form-error", "data-testid" => "card-title-error"], [$titleError]) : null]), Component::create("div", ["className" => "form-group"], [Component::create("select", ["value" => $newCardPriority, "onChange" => fn($e) => $setNewCardPriority($e->target->value), "data-testid" => "card-priority-select"], [Component::create("option", ["value" => "low"], ["Low Priority"]), Component::create("option", ["value" => "medium"], ["Medium Priority"]), Component::create("option", ["value" => "high"], ["High Priority"])])]), Component::create("div", ["className" => "form-actions"], [Component::create("button", ["className" => "btn btn-secondary", "onClick" => $handleCancelCard, "data-testid" => "cancel-card-btn"], [" Cancel "]), Component::create("button", ["className" => "btn btn-primary", "onClick" => $handleSaveCard, "data-testid" => "save-card-btn"], [" Add Card "])])]) : Component::create("button", ["className" => "add-card", "onClick" => $handleAddCard, "data-testid" => $addButtonTestId], [" + Add a card "])]);
}