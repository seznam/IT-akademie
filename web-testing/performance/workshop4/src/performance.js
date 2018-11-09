import puppeteer from 'puppeteer';
import devices from 'puppeteer/DeviceDescriptors';
import fs from 'fs';

const CHAR = {
	PASS: '✓',
	FAIL: '✘'
};
const URL = 'https://www.seznam.cz';
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

		this._printTimingResults(performance.timing, reference.timing);
		this._printCoverageResults(performance.coverage, reference.coverage);
	}

	_printTimingResults(current, reference) {
		console.log('Timing:');

		Object.keys(current).forEach(key => {
			let currentKeyValue = current[key];
			let referenceKeyValue = reference[key];

			this._printKeyResults(currentKeyValue, referenceKeyValue, key);
		});
	}

	_printCoverageResults(current, reference) {
		console.log('Coverage:');

		Object.keys(current).forEach(key => {
			let currentKeyValue = current[key].unusedPercent;
			let referenceKeyValue = reference[key].unusedPercent;

			this._printKeyResults(
				currentKeyValue,
				referenceKeyValue,
				`${key} unusedPercent`
			);
		});
	}

	_printKeyResults(current, reference, key) {
		let result = CHAR.PASS;

		if (reference * DIFF_TOLERANCE < current) {
			result = CHAR.FAIL;
		}

		console.log(
			result,
			key,
			`[curr: ${current}, ref: ${reference}]`
		);
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

		await page.coverage.startJSCoverage();
		await page.coverage.startCSSCoverage();
		await page.goto(url, { timeout: 90000 });
		let jsCoverage = await page.coverage.stopJSCoverage();
		let cssCoverage = await page.coverage.stopCSSCoverage();

		return {
			timing: await this._getTiming(page),
			coverage: {
				js: await this._getCoverage(jsCoverage),
				css: await this._getCoverage(cssCoverage)
			}
		};
	}

	async _getCoverage(coverage) {
		let totalBytes = 0;
		let usedBytes = 0;

		coverage.forEach(entry => {
			totalBytes += entry.text.length;

			entry.ranges.forEach(range => {
				usedBytes += range.end - range.start - 1;
			});
		})

		return {
			totalBytes,
			usedBytes,
			unusedPercent: (1 - usedBytes / totalBytes) * 100
		};
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
