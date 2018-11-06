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

		let performance = await this._getUrlPerformance(URL, page);

		console.log(performance);

		await browser.close();
	}

	async _getUrlPerformance(url, page) {
		await page.goto(url, { timeout: 90000 });

		let timing = JSON.parse(
			await page.evaluate(() => JSON.stringify(performance.timing))
		);
		let startTime = timing.navigationStart;

		Object.keys(timing)
			.forEach(key => {
				if (timing[key] === 0) {
					delete timing[key];
					return;
				}

				timing[key] = timing[key] - startTime;
			});

		return timing;
	}
}

export default new Performance();
