/**
 * How to create custom actions
 * https://github.com/seznam/QApe/blob/master/docs/CustomActions.md
 * Puppeteer documentation
 * https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
 */

const { AbstractAction } = require('qape').default;

class LoginAction extends AbstractAction {
	/**
	 * Unique ID for you action must be specified
	 * @returns {string}
	 */
	static get id() {
		return 'login';
	}

	/**
	 * You need to specify, if the action should be available
	 * for the specified element in the current page state.
	 * Note that this should not take too long, since it can
	 * have a great impact on QApe performance.
	 * @param {puppeteer.ElementHandle} element
	 * @param {puppeteer.Page} page
	 * @returns {boolean}
	 */
	static async isActionAvailable(element, page) {
        // Zjisti, zda je na strance prihlasovaci formular

        return false;
    }

    /**
	 * Overridable method returning a promise,
     * that should resolve when action was successfull
     * and reject when not.
	 * @param {puppeteer.ElementHandle} element
	 * @param {puppeteer.Page} page
	 * @param {puppeteer.Browser} browser
	 * @returns {Promise}
	 */
	async evaluateAction(element, page, browser) {
		// Over, ze prihlaseni bylo uspesne

		return Promise.reject('Login Failed!');
	}

	/**
	 * Perform the action
	 * @param {puppeteer.ElementHandle} element
	 * @param {puppeteer.Page} page
	 * @param {puppeteer.Browser} browser
	 * @returns {Promise}
	 */
	async action(element, page, browser) {
		// Proved prihlaseni
	}
}

module.exports = {
	default: LoginAction
};
