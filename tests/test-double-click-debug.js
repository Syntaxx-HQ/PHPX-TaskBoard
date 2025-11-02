const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // Capture all console messages
    const consoleLogs = [];
    page.on('console', msg => {
        const text = msg.text();
        consoleLogs.push(text);
        console.log(`[CONSOLE] ${text}`);
    });

    page.on('pageerror', error => {
        console.log(`[ERROR] ${error.message}`);
    });

    console.log('🔍 Loading page...');
    await page.goto('http://localhost:9901');
    await page.waitForTimeout(3000);  // Wait for WASM to load

    console.log('\n🔍 Looking for first card title...');
    const cardTitle = await page.locator('.card-title').first();

    // Check if it exists
    const exists = await cardTitle.count() > 0;
    console.log(`Card title exists: ${exists}`);

    if (exists) {
        const titleText = await cardTitle.textContent();
        console.log(`Card title text: "${titleText}"`);

        console.log('\n🔍 Double-clicking on card title...');
        await cardTitle.dblclick();

        console.log('\n🔍 Waiting for state update...');
        await page.waitForTimeout(2000);

        console.log('\n🔍 Checking for inline edit input...');
        const editInput = await page.locator('[data-testid="inline-edit-input"]');
        const editExists = await editInput.count() > 0;
        console.log(`Inline edit input exists: ${editExists}`);

        if (editExists) {
            const inputValue = await editInput.inputValue();
            console.log(`Input value: "${inputValue}"`);
            console.log('✅ Inline editing WORKS!');
        } else {
            console.log('❌ Inline editing NOT working - input not found');

            // Check console logs for double-click event
            const doubleClickLogs = consoleLogs.filter(log => log.includes('Double-click') || log.includes('ondoubleclick'));
            console.log('\n🔍 Double-click related logs:');
            doubleClickLogs.forEach(log => console.log(`  ${log}`));
        }
    }

    await page.waitForTimeout(5000);  // Keep browser open to inspect
    await browser.close();
})();
