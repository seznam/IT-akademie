import puppeteer from 'puppeteer';

const CHAR = {
	PASS: '✓',
	FAIL: '✘'
};
const URL = 'https://www.seznam.cz';

class Performance {
	async run() {
		let browser = await puppeteer.launch({ headless: true });
		let page = await browser.newPage();

		await page.goto(URL);

		let title = await page.title();

		console.log('Title:', title);

		await browser.close();
	}
}

export default new Performance();
