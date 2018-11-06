require('babel-core/register')({
	plugins: 'transform-es2015-modules-commonjs'
});

exports.config = {
	specs: [
		'specs/**/*E2E.js'
	],
	maxInstances: 2,
	capabilities: [{
		browserName: 'chrome',
		chromeOptions: {
			// args: ['--headless']
		}
	// }, {
	// 	browserName: 'firefox',
	// 	'moz:firefoxOptions': {
	// 		// args: ['-headless']
	// 	}
	}],
	logLevel: 'silent',
	coloredLogs: true,
	screenshotPath: 'screens',
	baseUrl: 'https://www.seznam.cz',
	waitforTimeout: 5000,
	framework: 'jasmine',
	jasmineNodeOpts: {
		defaultTimeoutInterval: 60000
	},
	reporters: ['dot', 'spec'],
	before: () => {
		browser.windowHandleMaximize();
	}
};
