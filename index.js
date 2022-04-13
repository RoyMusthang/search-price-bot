const puppeteer = require('puppeteer');

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://roymusthang.github.io');
  await page.screenshot({ path: 'ma.png' });
  await browser.close();
}

main()
