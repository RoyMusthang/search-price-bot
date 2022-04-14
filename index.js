const puppeteer = require('puppeteer');
const readline = require('readline-sync');

const site = 'https://www.mercadolivre.com.br';

async function inputUser() {
  const question = readline.question('Qual item quer procurar? ');
  main(question)
}

async function main(item) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(site);
  await browser.close();
}

inputUser()
