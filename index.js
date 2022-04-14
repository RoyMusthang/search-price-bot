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
  await page.type('.nav-search-input', item, { delay: 100 });
  await Promise.all([
    page.waitForNavigation(),
    page.click('.nav-search-btn')
  ]);
  // mais simples clicar de item em item do que tratar todos os dados da home
  const links = await page.$$eval('.ui-search-result__image > a', el => el.map(link => link.href));
  for (let link of links) {
    await page.goto(link)
    await page.waitForSelector('.ui-pdp-title')
    const title = await page.$eval('.ui-pdp-title', e => e.innerText);
    const price = await page.$eval('.andes-money-amount__fraction', e => e.innerText);

    const data = { title, price };
    dataList.push(data)
  }
  await writeFile(dataList)
  await browser.close();
}

inputUser()
