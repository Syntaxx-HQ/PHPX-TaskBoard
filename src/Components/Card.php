<?php
declare (strict_types=1);
namespace TaskBoard\Components;

use Syntaxx\PHPX\Framework\Component;
use Syntaxx\PHPX\Framework\Runtime;

// Define useState as a function that calls Runtime::useState
function useState($initialValue) {
    return Runtime::useState($initialValue);
}
function Card($props)
{
    $card = $props['card'];
    $onDelete = $props['onDelete'];
    $onUpdate = $props['onUpdate'];
    $onDragStart = $props['onDragStart'] ?? fn() => null;
    $onDragEnd = $props['onDragEnd'] ?? fn() => null;
    [$isEditing, $setIsEditing] = useState(false);
    [$editTitle, $setEditTitle] = useState($card['title']);
    [$isModalOpen, $setIsModalOpen] = useState(false);
    [$showDeleteConfirm, $setShowDeleteConfirm] = useState(false);
    // Handle title double-click to edit
    $handleTitleDoubleClick = fn() => $setIsEditing(true) || $setEditTitle($card['title']) || null;
    // Handle save edit
    $handleSaveEdit = fn() => (function () use ($editTitle, $onUpdate, $setIsEditing) {
        $title = trim($editTitle);
        if (!empty($title)) {
            $onUpdate(['title' => $title]);
        }
        $setIsEditing(false);
    })();
    // Handle cancel edit
    $handleCancelEdit = fn() => $setEditTitle($card['title']) || $setIsEditing(false) || null;
    // Handle card click to open modal
    $handleCardClick = fn($e) => !$isEditing && !$e->target->closest('.delete-card-btn') ? $setIsModalOpen(true) : null;
    // Handle delete button click
    $handleDeleteClick = fn($e) => $e->stopPropagation() || $setShowDeleteConfirm(true) || null;
    // Handle confirm delete
    $handleConfirmDelete = fn() => $onDelete() || $setShowDeleteConfirm(false) || $setIsModalOpen(false) || null;
    // Handle cancel delete
    $handleCancelDelete = fn() => $setShowDeleteConfirm(false);
    // Get priority class
    $getPriorityClass = fn($priority) => match ($priority) {
        'high' => 'priority-high',
        'medium' => 'priority-medium',
        'low' => 'priority-low',
        default => '',
    };
    // Get priority label
    $getPriorityLabel = fn($priority) => match ($priority) {
        'high' => 'High',
        'medium' => 'Medium',
        'low' => 'Low',
        default => 'Medium',
    };
    return Component::create("", ["data-phpx-source" => "Card.phpx:80:1"], [Component::create("div", ["className" => "card", "data-testid" => $card['id'], "draggable" => "true", "onDragStart" => $onDragStart, "onDragEnd" => $onDragEnd, "onClick" => $handleCardClick, "data-phpx-source" => "Card.phpx:81:1"], [$isEditing ? Component::create("input", ["type" => "text", "className" => "inline-edit-input", "value" => $editTitle, "onChange" => fn($e) => $setEditTitle($e->target->value), "onKeyPress" => fn($e) => $e->key === 'Enter' ? $handleSaveEdit() : null, "onKeyDown" => fn($e) => $e->key === 'Escape' ? $handleCancelEdit() : null, "onBlur" => $handleSaveEdit, "data-testid" => "inline-edit-input", "autoFocus" => true, "onClick" => fn($e) => $e->stopPropagation(), "data-phpx-source" => "Card.phpx:90:1"], []) : Component::create("div", ["className" => "card-title", "onDoubleClick" => $handleTitleDoubleClick, "data-phpx-source" => "Card.phpx:103:1"], [$card['title']]), Component::create("div", ["className" => "card-meta", "data-phpx-source" => "Card.phpx:108:1"], [Component::create("span", ["className" => "card-priority " . $getPriorityClass($card['priority'] ?? 'medium'), "data-phpx-source" => "Card.phpx:109:1"], [$getPriorityLabel($card['priority'] ?? 'medium')])]), Component::create("button", ["className" => "delete-card-btn", "onClick" => $handleDeleteClick, "data-testid" => "delete-card-btn", "title" => "Delete card", "data-phpx-source" => "Card.phpx:114:1"], [" × "])]), $showDeleteConfirm ? Component::create("div", ["className" => "confirm-dialog", "data-phpx-source" => "Card.phpx:125:1"], [Component::create("div", ["className" => "confirm-content", "data-phpx-source" => "Card.phpx:126:1"], [Component::create("p", ["data-phpx-source" => "Card.phpx:127:1"], ["Are you sure you want to delete this card?"]), Component::create("div", ["className" => "form-actions", "data-phpx-source" => "Card.phpx:128:1"], [Component::create("button", ["className" => "btn btn-secondary", "onClick" => $handleCancelDelete, "data-testid" => "cancel-delete-btn", "data-phpx-source" => "Card.phpx:129:1"], [" Cancel "]), Component::create("button", ["className" => "btn btn-danger", "onClick" => $handleConfirmDelete, "data-testid" => "confirm-delete-btn", "data-phpx-source" => "Card.phpx:136:1"], [" Delete "])])])]) : null, $isModalOpen ? Component::create("div", ["className" => "card-modal active", "data-testid" => "card-modal", "data-phpx-source" => "Card.phpx:149:1"], [Component::create("div", ["className" => "modal-content", "data-phpx-source" => "Card.phpx:150:1"], [Component::create("div", ["className" => "modal-header", "data-phpx-source" => "Card.phpx:151:1"], [Component::create("h2", ["data-testid" => "modal-card-title", "data-phpx-source" => "Card.phpx:152:1"], [$card['title']]), Component::create("button", ["className" => "modal-close-btn", "onClick" => fn() => $setIsModalOpen(false), "data-testid" => "modal-close-btn", "data-phpx-source" => "Card.phpx:153:1"], [" × "])]), Component::create("div", ["className" => "modal-body", "data-phpx-source" => "Card.phpx:162:1"], [Component::create("div", ["className" => "form-group", "data-phpx-source" => "Card.phpx:163:1"], [Component::create("label", ["data-phpx-source" => "Card.phpx:164:1"], ["Priority"]), Component::create("select", ["value" => $card['priority'] ?? 'medium', "onChange" => fn($e) => $onUpdate(['priority' => $e->target->value]), "data-phpx-source" => "Card.phpx:165:1"], [Component::create("option", ["value" => "low", "data-phpx-source" => "Card.phpx:169:1"], ["Low"]), Component::create("option", ["value" => "medium", "data-phpx-source" => "Card.phpx:170:1"], ["Medium"]), Component::create("option", ["value" => "high", "data-phpx-source" => "Card.phpx:171:1"], ["High"])])]), Component::create("div", ["className" => "form-group", "data-phpx-source" => "Card.phpx:175:1"], [Component::create("label", ["data-phpx-source" => "Card.phpx:176:1"], ["Description"]), Component::create("textarea", ["placeholder" => "Add a description...", "value" => $card['description'] ?? '', "onChange" => fn($e) => $onUpdate(['description' => $e->target->value]), "data-phpx-source" => "Card.phpx:177:1"], [])]), Component::create("div", ["className" => "form-group", "data-phpx-source" => "Card.phpx:184:1"], [Component::create("label", ["data-phpx-source" => "Card.phpx:185:1"], ["Card ID"]), Component::create("div", ["className" => "card-id", "data-phpx-source" => "Card.phpx:186:1"], [$card['id']])])]), Component::create("div", ["className" => "modal-footer", "data-phpx-source" => "Card.phpx:190:1"], [Component::create("button", ["className" => "btn btn-danger", "onClick" => $handleConfirmDelete, "data-phpx-source" => "Card.phpx:191:1"], [" Delete Card "])])])]) : null]);
}