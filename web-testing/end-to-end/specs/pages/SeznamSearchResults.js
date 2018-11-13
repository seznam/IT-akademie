export default class SeznamSearchResults {
	static resultTitle() {
		return browser.element('.Result-title');
	}

	static nothingFoundTitle() {
		return browser.element('.SimpleResult-title');
	}
}
