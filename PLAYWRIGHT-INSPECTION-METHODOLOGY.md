# Playwright Inspection Methodology

## The Cardinal Rule: INSPECT → UNDERSTAND → FIX → TEST

Never run tests on a broken application. First understand what's broken.

## Phase 1: Initial Inspection (2 minutes)

### Step 1: Create Console Inspector
```javascript
// inspect-console.js
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // ALWAYS SET UP THESE LISTENERS FIRST
    page.on('console', msg => {
        console.log(`[${msg.type()}] ${msg.text()}`);
    });

    page.on('pageerror', error => {
        console.log(`[PAGE ERROR] ${error.message}`);
    });

    page.on('requestfailed', request => {
        console.log(`[REQUEST FAILED] ${request.url()}`);
    });

    await page.goto('http://localhost:9901');
    await page.waitForTimeout(2000);  // Let WASM load

    await browser.close();
})();
```

**Run this FIRST. Always.**

### Step 2: Check DOM State
```javascript
// inspect-dom.js
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('http://localhost:9901');
    await page.waitForTimeout(2000);

    // What's actually in the DOM?
    const appContent = await page.evaluate(() => {
        const app = document.getElementById('app');
        return {
            exists: !!app,
            innerHTML: app ? app.innerHTML.substring(0, 200) : 'Not found',
            childCount: app ? app.children.length : 0,
            className: app ? app.className : ''
        };
    });

    console.log('App Element:', appContent);

    // Check for expected elements
    const elements = await page.evaluate(() => {
        return {
            hasLoader: !!document.querySelector('.loading'),
            hasError: !!document.querySelector('.error'),
            targetElements: {
                header: !!document.querySelector('[data-testid="app-header"]'),
                board: !!document.querySelector('[data-testid="kanban-board"]'),
                columns: document.querySelectorAll('[data-testid^="column-"]').length
            }
        };
    });

    console.log('DOM State:', elements);

    await browser.close();
})();
```

## Phase 2: Interactive Debugging (5 minutes)

### Step 3: Visual Inspection with DevTools
```javascript
// inspect-interactive.js
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: false,  // Show browser
        devtools: true    // Auto-open DevTools
    });

    const page = await browser.newPage();

    // Log everything
    page.on('console', msg => {
        console.log(`[Console] ${msg.text()}`);
    });

    await page.goto('http://localhost:9901');

    // Take screenshot for documentation
    await page.screenshot({ path: 'debug-state.png', fullPage: true });

    console.log('Browser open for manual inspection. Press Ctrl+C to close.');

    // Keep open for manual debugging
    await new Promise(() => {});
})();
```

### Step 4: Check JavaScript State
```javascript
// inspect-js-state.js
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('http://localhost:9901');
    await page.waitForTimeout(3000);

    const jsState = await page.evaluate(() => {
        return {
            // Check if PHP WASM loaded
            phpLoaded: typeof window.php !== 'undefined',

            // Check custom app state
            appState: {
                TaskBoard: window.TaskBoard || 'Not initialized',
                onPHPReady: typeof window.onPHPReady,
                onPHPError: typeof window.onPHPError
            },

            // Check for error messages
            errors: Array.from(document.querySelectorAll('.error')).map(e => e.textContent),

            // Check console errors (if stored)
            consoleErrors: window.__errors || []
        };
    });

    console.log('JavaScript State:', JSON.stringify(jsState, null, 2));

    await browser.close();
})();
```

## Phase 3: Problem Identification (2 minutes)

### Step 5: Error Pattern Analysis
```javascript
// inspect-errors.js
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const errors = [];
    const warnings = [];
    const logs = [];

    page.on('console', msg => {
        const text = msg.text();
        if (msg.type() === 'error') errors.push(text);
        else if (msg.type() === 'warning') warnings.push(text);
        else logs.push(text);
    });

    page.on('pageerror', error => {
        errors.push(`PAGE ERROR: ${error.message}`);
    });

    await page.goto('http://localhost:9901');
    await page.waitForTimeout(3000);

    console.log('\n=== ERROR SUMMARY ===');
    console.log('Errors:', errors.length);
    errors.forEach(e => console.log('  ❌', e.substring(0, 100)));

    console.log('\nWarnings:', warnings.length);
    warnings.forEach(w => console.log('  ⚠️', w.substring(0, 100)));

    console.log('\nKey Logs:', logs.filter(l => l.includes('error') || l.includes('fail')).length);

    // Identify common error patterns
    const patterns = {
        'PHP Errors': errors.filter(e => e.includes('Fatal error') || e.includes('PHP')),
        'JavaScript Errors': errors.filter(e => e.includes('TypeError') || e.includes('ReferenceError')),
        'Network Errors': errors.filter(e => e.includes('404') || e.includes('Failed to fetch')),
        'WASM Errors': errors.filter(e => e.includes('wasm') || e.includes('WebAssembly'))
    };

    console.log('\n=== ERROR PATTERNS ===');
    Object.entries(patterns).forEach(([type, errs]) => {
        if (errs.length > 0) {
            console.log(`${type}: ${errs.length} found`);
            console.log('  First:', errs[0]?.substring(0, 150));
        }
    });

    await browser.close();
})();
```

## Phase 4: Only Now Run Tests (After Fixing Issues)

### Step 6: Incremental Test Running
```bash
# Only after console shows no errors
npx playwright test board.spec.ts:4 --project=chromium

# If that passes, run more
npx playwright test board.spec.ts --project=chromium

# Finally, run all
npx playwright test
```

## The Decision Tree

```
Start
  ↓
Run inspect-console.js
  ↓
Any errors? → YES → Fix them first
  ↓ NO
Run inspect-dom.js
  ↓
Elements missing? → YES → Check rendering logic
  ↓ NO
Run inspect-interactive.js
  ↓
Visual issues? → YES → Fix CSS/Layout
  ↓ NO
NOW run tests
```

## Common Patterns to Look For

### PHP/WASM Errors
```
Fatal error: Call to undefined function
Fatal error: Class not found
Warning: include(): Failed opening
```
**Action**: Check namespaces, file paths, autoloading

### JavaScript Errors
```
TypeError: Cannot read property 'x' of undefined
ReferenceError: x is not defined
```
**Action**: Check initialization order, variable scope

### DOM Issues
```
innerHTML: "<div class='loading'>...</div>"
childCount: 0
```
**Action**: Check if render logic is executing

## The 5-Minute Debug Protocol

1. **Minute 1**: Run `inspect-console.js` - Identify errors
2. **Minute 2**: Run `inspect-dom.js` - Check what rendered
3. **Minute 3**: Analyze error patterns
4. **Minute 4**: Fix the most obvious error
5. **Minute 5**: Verify fix with `inspect-console.js`

## Emergency Debugging

When completely stuck:
```javascript
// nuclear-inspect.js
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false, devtools: true });
    const page = await browser.newPage();

    // Log EVERYTHING
    page.on('console', msg => console.log('CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('ERROR:', err.message));
    page.on('request', req => console.log('REQUEST:', req.url()));
    page.on('response', res => console.log('RESPONSE:', res.status(), res.url()));

    console.log('Loading page...');
    await page.goto('http://localhost:9901');

    // Inject debug helper
    await page.evaluate(() => {
        window.DEBUG = {
            checkElement: (selector) => {
                const el = document.querySelector(selector);
                console.log(`Element ${selector}:`, el ? 'Found' : 'Not found', el);
                return el;
            },
            checkState: () => {
                console.log('Window:', window);
                console.log('Document ready:', document.readyState);
                console.log('App element:', document.getElementById('app'));
            }
        };
        console.log('Debug helpers injected. Use window.DEBUG in console.');
    });

    console.log('Page loaded. Inspect in DevTools. Press Ctrl+C to exit.');
    await new Promise(() => {});
})();
```

## Remember

1. **Console First**: 90% of problems are visible in console
2. **Simple Scripts**: Start with 10-line inspectors, not complex tests
3. **Incremental**: Fix one error at a time
4. **Visual**: Sometimes headless:false shows issues immediately
5. **Document**: Screenshot errors for future reference

## The Mantra

**"What IS happening?"** not "What SHOULD happen?"

**"Show me the error"** not "Run the test"

**"Inspect, don't expect"**