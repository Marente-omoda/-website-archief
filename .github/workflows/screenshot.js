const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();

  const page = await browser.newPage({
    viewport: {
      width: 1440,
      height: 900
    }
  });

  await page.goto('https://www.omoda.nl/dames/', {
    waitUntil: 'networkidle'
  });

  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }

  const today = new Date().toISOString().split('T')[0];

  await page.screenshot({
    path: `screenshots/${today}.png`,
    fullPage: true
  });

  await browser.close();
})();
