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

    console.log('\n=== TESTING VRZNO addEventListener DIRECTLY ===\n');

    // Test if VRZNO addEventListener works at all from JavaScript
    await page.evaluate(() => {
        const testDiv = window.document.createElement('div');
        testDiv.textContent = 'TEST DIV';
        testDiv.id = 'test-div-vrzno';
        testDiv.style.padding = '20px';
        testDiv.style.background = 'yellow';
        window.document.body.appendChild(testDiv);

        // Add listener
        testDiv.addEventListener('click', function() {
            console.log('🎉 VRZNO addEventListener WORKS from JS!');
        });
    });

    await page.waitForTimeout(500);

    // Click the test div
    console.log('Clicking test div...');
    await page.click('#test-div-vrzno');
    await page.waitForTimeout(2000);

    await browser.close();
})();
