const puppeteer = require('puppeteer');
const readline = require('readline-sync');

async function inputUser() {
  const question = readline.question('Qual item quer procurar? ');
  main(question)
}

async function main(item) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`https://www.mercadolivre.com.br/${item}`);
  await page.screenshot({ path: 'ma.png' });
  await browser.close();
}

inputUser()
