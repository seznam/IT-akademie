/**
 * List of available config options
 * https://github.com/seznam/QApe/blob/master/docs/Config.md
 */

module.exports = {
	parallelInstances: 1,
	stopNewScenariosAfterTime: 10000,
	url: 'http://localhost:3000/',
	headlessModeDisabled: true,
	pageErrorHandler: () => {
        window.addEventListener('error', (event) => {
            qapeError(event.error.stack);
        });
    },
	shouldRequestCauseError: (response, config) => {
        return response.status() >= 500;
    },
	beforeScenarioScript: async ({ browser, page }) => {
        // Script executed before each scenario
    },
	beforeActionScript: async ({ browser, page }, pageErrorHandler) => {
        // Script executed before each action
    },
	afterActionScript: async ({ browser, page }, pageErrorHandler) => {
        // Script executed after each action
    },
	afterScenarioScript: async ({ browser, page }) => {
        // Script executed after each scenario
    },
	reporters: ['console', 'file', 'spinner'],
	reportPath: './report',
	customActions: ['./LoginAction.js']
}
