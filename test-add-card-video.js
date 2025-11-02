const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 500  // Slow down so we can see what happens
    });
    const context = await browser.newContext({
        recordVideo: {
            dir: './videos/',
            size: { width: 1280, height: 720 }
        }
    });
    const page = await context.newPage();

    console.log('📹 Recording video...');
    console.log('🌐 Navigating to http://localhost:9901');

    await page.goto('http://localhost:9901');
    await page.waitForTimeout(3000);

    console.log('✅ Page loaded');

    // Count initial cards
    const initialCount = await page.locator('[data-testid="column-todo"] [data-testid^="card-"]').count();
    console.log('📊 Initial card count in To Do: ' + initialCount);

    // Click "Add a card" button
    console.log('🔵 Clicking "Add a card" button...');
    await page.click('[data-testid="add-card-todo"]');
    await page.waitForTimeout(1000);

    // Fill in the form
    console.log('📝 Filling in card title...');
    await page.fill('[data-testid="card-title-input"]', 'Test Card from Video');
    await page.waitForTimeout(500);

    // Click Add Card button
    console.log('✅ Clicking Add Card button...');
    await page.click('[data-testid="save-card-btn"]');
    await page.waitForTimeout(2000);

    // Count cards after adding
    const finalCount = await page.locator('[data-testid="column-todo"] [data-testid^="card-"]').count();
    console.log('📊 Final card count in To Do: ' + finalCount);
    console.log('📈 Cards added: ' + (finalCount - initialCount));

    if (finalCount === initialCount + 1) {
        console.log('✅ SUCCESS! Exactly 1 card was added');
    } else {
        console.log('❌ FAILURE! Expected ' + (initialCount + 1) + ', got ' + finalCount);
    }

    await page.waitForTimeout(2000);

    await context.close();
    await browser.close();

    console.log('📹 Video saved to ./videos/');
})();
