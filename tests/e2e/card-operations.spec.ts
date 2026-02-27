import { test, expect } from '@playwright/test';

test.describe('TaskBoard - Card Operations', () => {
  test('adds a new card to To Do column', async ({ page }) => {
    await page.goto('/');

    // Wait for the WASM app to render the seed cards before counting (otherwise
    // the initial count is taken on the empty pre-render DOM and reads 0).
    await page.waitForSelector('[data-testid="column-todo"] .card');

    // Count initial cards in To Do
    const initialCardCount = await page.locator('[data-testid="column-todo"] .card').count();

    // Click add card button
    await page.click('[data-testid="add-card-todo"]');

    // Input form should appear
    await expect(page.locator('[data-testid="new-card-form"]')).toBeVisible();

    // Fill in the card title
    await page.fill('[data-testid="card-title-input"]', 'New Test Task');

    // Submit the form
    await page.click('[data-testid="save-card-btn"]');

    // Form should disappear
    await expect(page.locator('[data-testid="new-card-form"]')).not.toBeVisible();

    // New card should be visible
    await expect(page.locator('text=New Test Task')).toBeVisible();

    // Card count should increase by 1
    const newCardCount = await page.locator('[data-testid="column-todo"] .card').count();
    expect(newCardCount).toBe(initialCardCount + 1);
  });

  test('cancels adding a card', async ({ page }) => {
    await page.goto('/');

    // Click add card button
    await page.click('[data-testid="add-card-todo"]');

    // Fill in the card title
    await page.fill('[data-testid="card-title-input"]', 'Task to Cancel');

    // Click cancel
    await page.click('[data-testid="cancel-card-btn"]');

    // Form should disappear
    await expect(page.locator('[data-testid="new-card-form"]')).not.toBeVisible();

    // Card should not be added
    await expect(page.locator('text=Task to Cancel')).not.toBeVisible();
  });

  test('validates card title is required', async ({ page }) => {
    await page.goto('/');

    // Click add card button
    await page.click('[data-testid="add-card-todo"]');

    // Try to submit without title
    await page.click('[data-testid="save-card-btn"]');

    // Should show validation error
    await expect(page.locator('[data-testid="card-title-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="card-title-error"]')).toContainText('Title is required');

    // Card should not be added
    await expect(page.locator('[data-testid="new-card-form"]')).toBeVisible();
  });

  test('adds card with Enter key', async ({ page }) => {
    await page.goto('/');

    // Click add card button
    await page.click('[data-testid="add-card-todo"]');

    // Fill in the card title and press Enter
    await page.fill('[data-testid="card-title-input"]', 'Quick Add Task');
    await page.press('[data-testid="card-title-input"]', 'Enter');

    // Card should be added
    await expect(page.locator('text=Quick Add Task')).toBeVisible();
  });

  test('deletes a card', async ({ page }) => {
    await page.goto('/');

    // Ensure at least one card exists
    const firstCard = page.locator('[data-testid^="card-"]').first();
    const cardText = await firstCard.textContent();

    // Hover to show delete button
    await firstCard.hover();

    // Click delete button
    await page.click('[data-testid="delete-card-btn"]');

    // Confirm deletion
    await page.click('[data-testid="confirm-delete-btn"]');

    // Card should be removed
    await expect(page.locator(`text="${cardText}"`)).not.toBeVisible();
  });

  test('opens card detail modal on click', async ({ page }) => {
    await page.goto('/');

    // Click on a card
    const firstCard = page.locator('[data-testid^="card-"]').first();
    await firstCard.click();

    // Modal should open
    await expect(page.locator('[data-testid="card-modal"]')).toBeVisible();

    // Modal should show card details
    const cardTitle = await firstCard.locator('.card-title').textContent();
    await expect(page.locator('[data-testid="modal-card-title"]')).toContainText(cardTitle || '');

    // Close modal with X button
    await page.click('[data-testid="modal-close-btn"]');
    await expect(page.locator('[data-testid="card-modal"]')).not.toBeVisible();
  });

  test('edits card title inline', async ({ page }) => {
    await page.goto('/');

    // Double-click on card title to edit
    const firstCard = page.locator('[data-testid^="card-"]').first();
    const titleElement = firstCard.locator('.card-title');

    await titleElement.dblclick();

    // Input should appear
    const input = firstCard.locator('[data-testid="inline-edit-input"]');
    await expect(input).toBeVisible();

    // Clear and type new title
    await input.fill('Updated Task Title');
    await input.press('Enter');

    // New title should be displayed
    await expect(firstCard).toContainText('Updated Task Title');
  });
});