const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 1000 });
    const page = await browser.newPage();

    // Capture ALL console output
    page.on('console', msg => {
        console.log('[BROWSER] ' + msg.text());
    });

    await page.goto('http://localhost:9901');
    await page.waitForTimeout(5000);

    console.log('\n========================================');
    console.log('CLICKING ON CARD NOW...');
    console.log('========================================\n');

    // Click on the card title (not the delete button)
    await page.click('[data-testid="card-1"] .card-title');

    await page.waitForTimeout(5000);

    // Check if modal exists
    const modalExists = await page.locator('[data-testid="card-modal"]').count();
    const modalVisible = await page.locator('[data-testid="card-modal"].active').count();

    console.log('\n========================================');
    console.log('RESULTS:');
    console.log('Modal exists:', modalExists);
    console.log('Modal visible:', modalVisible);
    console.log('========================================\n');

    await browser.close();
})();
