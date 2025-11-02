const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    page.on('console', msg => console.log(`[CONSOLE] ${msg.text()}`));

    console.log('🔍 Loading page...');
    await page.goto('http://localhost:9901');
    await page.waitForTimeout(3000);

    console.log('\n🔍 Double-clicking on first card title...');
    const firstCard = page.locator('[data-testid^="card-"]').first();
    const titleElement = firstCard.locator('.card-title');
    await titleElement.dblclick();
    await page.waitForTimeout(1000);

    const input = firstCard.locator('[data-testid="inline-edit-input"]');
    const inputVisible = await input.isVisible();
    console.log(`Input visible: ${inputVisible ? '✅ YES' : '❌ NO'}`);

    if (inputVisible) {
        console.log('\n🔍 Filling input with "Updated Task Title"...');
        await input.fill('Updated Task Title');
        await page.waitForTimeout(500);

        console.log('\n🔍 Pressing Enter...');
        await input.press('Enter');
        await page.waitForTimeout(2000);

        // Check if the new title is displayed
        const cardText = await firstCard.textContent();
        console.log(`\nCard text after Enter: "${cardText}"`);

        const hasNewTitle = cardText.includes('Updated Task Title');
        console.log(`Has new title: ${hasNewTitle ? '✅ YES' : '❌ NO'}`);

        // Check if input is still visible (should be hidden)
        const inputStillVisible = await input.isVisible().catch(() => false);
        console.log(`Input still visible: ${inputStillVisible ? '❌ YES (BAD)' : '✅ NO (GOOD)'}`);
    }

    await page.waitForTimeout(5000);
    await browser.close();
})();
