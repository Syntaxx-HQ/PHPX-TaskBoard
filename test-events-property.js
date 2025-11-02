const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 500 });
    const page = await browser.newPage();

    // Listen to console
    page.on('console', msg => {
        const text = msg.text();
        console.log('[BROWSER] ' + text);
    });

    await page.goto('http://localhost:9901');
    await page.waitForTimeout(4000);

    console.log('\n=== TEST 1: Clicking Add Card button ===\n');
    await page.click('[data-testid="add-card-todo"]');
    await page.waitForTimeout(2000);

    // Check if form appeared
    const formExists = await page.locator('[data-testid="new-card-form"]').count();
    console.log('Form appeared:', formExists > 0);

    console.log('\n=== TEST 2: Clicking on card (should open modal) ===\n');
    await page.click('[data-testid="card-1"]');
    await page.waitForTimeout(2000);

    // Check if modal appeared
    const modalExists = await page.locator('[data-testid="card-modal"]').count();
    console.log('Modal appeared:', modalExists > 0);

    await browser.close();
})();
