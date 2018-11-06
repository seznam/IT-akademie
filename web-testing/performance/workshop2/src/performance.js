import puppeteer from 'puppeteer';
import devices from 'puppeteer/DeviceDescriptors';

const CHAR = {
	PASS: '✓',
	FAIL: '✘'
};
const URL = 'https://www.seznamzpravy.cz';

class Performance {
	async run() {
		let browser = await puppeteer.launch({ headless: true });
		let page = await browser.newPage();

		await this._emulatePageConditions(page);

		let performance = await this._getUrlPerformance(URL, page);

		console.log(performance);

		await browser.close();
	}

	async _emulatePageConditions(page) {
		let client = await page.target().createCDPSession();

		await client.send('Network.emulateNetworkConditions', {
			offline: false,
			downloadThroughput: 780 * 1024 / 8,
			uploadThroughput: 330 * 1024 / 8,
			latency: 200
		});
		await page.emulate(devices['Pixel 2']);
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
