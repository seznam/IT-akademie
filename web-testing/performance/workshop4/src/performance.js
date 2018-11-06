import puppeteer from 'puppeteer';
import devices from 'puppeteer/DeviceDescriptors';
import fs from 'fs';

const CHAR = {
	PASS: '✓',
	FAIL: '✘'
};
const URL = 'https://www.seznamzpravy.cz';
const REFERENCE_DATA_PATH = './referenceData.json';
const DIFF_TOLERANCE = 1.2;

class Performance {
	async run() {
		let browser = await puppeteer.launch({ headless: true });
		let page = await browser.newPage();

		await this._emulatePageConditions(page);

		let performance = await this._getUrlPerformance(URL, page);

		if (!fs.existsSync(REFERENCE_DATA_PATH)) {
			fs.writeFileSync(
				REFERENCE_DATA_PATH,
				JSON.stringify(performance, null, '\t')
			);
			console.log('Reference data saved.');
		} else {
			this._printResults(performance);
		}

		await browser.close();
	}

	_printResults(performance) {
		let reference = this._getReferenceData();

		Object.keys(performance)
			.forEach(performanceKey => {
				console.log(performanceKey);

				Object.keys(performance[performanceKey]).forEach(key => {
					let currentValue = performance[performanceKey][key];
					let referenceValue = reference[performanceKey][key];
					let result = CHAR.PASS;

					if (referenceValue * DIFF_TOLERANCE < currentValue) {
						result = CHAR.FAIL;
					}

					console.log(
						result,
						key,
						`[curr: ${currentValue}, ref: ${referenceValue}]`
					);
				});
			})
	}

	_getReferenceData() {
		return JSON.parse(fs.readFileSync(REFERENCE_DATA_PATH, 'utf-8'));
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
		let requests = [];
		let responseHandler = response => requests.push(response.request());

		page.on('response', responseHandler);
		await page.goto(url, { timeout: 90000 });
		page.removeListener('response', responseHandler);

		return {
			timing: await this._getTiming(page),
			sizes: await this._getSizes(requests)
		}
	}

	async _getSizes(requests) {
		let sizes = {};

		for (let request of requests) {
			let response = request.response();
			let resourceType = request.resourceType();

			if (!response.ok() || !resourceType) {
				continue;
			}

			let buffer;

			try {
				buffer = await response.buffer();
			} catch (e) {
				console.warn(
					`Failed to load buffer for request at url ${request.url()}`
				);
				continue;
			}

			if (!sizes[resourceType]) {
				sizes[resourceType] = 0;
			}

			sizes[resourceType] += buffer.length;
		};

		return sizes;
	}

	async _getTiming(page) {
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
