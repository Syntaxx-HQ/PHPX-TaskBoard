import { test, expect } from '@playwright/test';

test.describe('TaskBoard - Board Display', () => {
  test('displays the application header', async ({ page }) => {
    await page.goto('/');

    // Check header is visible
    await expect(page.locator('[data-testid="app-header"]')).toBeVisible();
    await expect(page.locator('h1')).toContainText('TaskBoard Pro');
  });

  test('displays board with three default columns', async ({ page }) => {
    await page.goto('/');

    // Wait for board to load
    await page.waitForSelector('[data-testid="kanban-board"]');

    // Check all three columns are present
    await expect(page.locator('[data-testid="column-todo"]')).toBeVisible();
    await expect(page.locator('[data-testid="column-in-progress"]')).toBeVisible();
    await expect(page.locator('[data-testid="column-done"]')).toBeVisible();

    // Check column titles
    await expect(page.locator('[data-testid="column-todo"] h2')).toContainText('To Do');
    await expect(page.locator('[data-testid="column-in-progress"] h2')).toContainText('In Progress');
    await expect(page.locator('[data-testid="column-done"] h2')).toContainText('Done');
  });

  test('displays sample cards in columns', async ({ page }) => {
    await page.goto('/');

    // Check that sample cards exist
    await expect(page.locator('[data-testid^="card-"]').first()).toBeVisible();

    // Verify at least one card in To Do column
    await expect(
      page.locator('[data-testid="column-todo"] [data-testid^="card-"]').first()
    ).toBeVisible();
  });

  test('shows add card button for each column', async ({ page }) => {
    await page.goto('/');

    // Check each column has an add card button
    await expect(page.locator('[data-testid="add-card-todo"]')).toBeVisible();
    await expect(page.locator('[data-testid="add-card-in-progress"]')).toBeVisible();
    await expect(page.locator('[data-testid="add-card-done"]')).toBeVisible();
  });

  test('board is responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Board should switch to vertical scroll on mobile
    const board = page.locator('[data-testid="kanban-board"]');
    await expect(board).toBeVisible();

    // All columns should still be accessible (via scroll)
    await expect(page.locator('[data-testid="column-todo"]')).toBeVisible();
  });
});