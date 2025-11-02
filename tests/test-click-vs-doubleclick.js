const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    page.on('console', msg => console.log(`[CONSOLE] ${msg.text()}`));

    console.log('🔍 Loading page...');
    await page.goto('http://localhost:9901');
    await page.waitForTimeout(3000);

    const cardTitle = await page.locator('.card-title').first();

    // Test 1: Single click should open modal
    console.log('\n🔍 TEST 1: Single-click on card title (should open modal)...');
    await cardTitle.click();
    await page.waitForTimeout(1000);

    const modalVisible = await page.locator('[data-testid="card-modal"]').isVisible();
    console.log(`Modal visible after single-click: ${modalVisible ? '✅ YES' : '❌ NO'}`);

    if (modalVisible) {
        console.log('Closing modal...');
        await page.click('[data-testid="modal-close-btn"]');
        await page.waitForTimeout(1000);
    }

    // Test 2: Double-click should show inline edit
    console.log('\n🔍 TEST 2: Double-click on card title (should show inline edit)...');
    await cardTitle.dblclick();
    await page.waitForTimeout(2000);

    const inputVisible = await page.locator('[data-testid="inline-edit-input"]').isVisible();
    console.log(`Inline edit input visible after double-click: ${inputVisible ? '✅ YES' : '❌ NO'}`);

    const modalVisibleAfterDbl = await page.locator('[data-testid="card-modal"]').isVisible();
    console.log(`Modal visible after double-click: ${modalVisibleAfterDbl ? '❌ YES (BAD!)' : '✅ NO (GOOD!)'}`);

    console.log('\n📊 SUMMARY:');
    console.log(`  Single-click opens modal: ${modalVisible ? '✅' : '❌'}`);
    console.log(`  Double-click shows inline edit: ${inputVisible ? '✅' : '❌'}`);
    console.log(`  Double-click does NOT open modal: ${!modalVisibleAfterDbl ? '✅' : '❌'}`);

    await page.waitForTimeout(5000);
    await browser.close();
})();
