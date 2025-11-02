const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // Capture console logs
    page.on('console', msg => {
        console.log(`[${msg.type()}]`, msg.text());
    });

    page.on('pageerror', error => {
        console.log('❌ PAGE ERROR:', error.message);
    });

    await page.goto('http://localhost:9901');
    console.log('\n✅ Page loaded, waiting for WASM...\n');
    await page.waitForTimeout(3000);

    // Click "Add a card" button in To Do column
    console.log('🔵 Clicking "Add a card" button...');
    await page.click('[data-testid="add-card-todo"]');
    await page.waitForTimeout(500);

    // Focus on the title input
    const titleInput = page.locator('[data-testid="card-title-input"]');
    await titleInput.click();
    console.log('🔵 Focused on title input');

    // Type multiple characters rapidly
    console.log('🔵 Typing "Test Card 123"...');
    await titleInput.type('Test Card 123', { delay: 50 });

    await page.waitForTimeout(500);

    // Check the value
    const value = await titleInput.inputValue();
    console.log(`\n📝 Input value: "${value}"`);
    console.log(`📝 Expected: "Test Card 123"`);

    if (value === 'Test Card 123') {
        console.log('\n✅ SUCCESS! Focus was preserved during typing!');
        console.log('✅ Virtual DOM is working correctly!');
    } else {
        console.log(`\n❌ FAILURE! Value is "${value}"`);
        console.log('❌ Focus was lost or characters were dropped');
    }

    // Keep browser open for inspection
    await page.waitForTimeout(3000);
    await browser.close();
})();
