export default class SeznamHome {
	static searchBar() {
		return browser.element('.input--hp-search');
	}

	static searchButton() {
		return browser.element('.search-form__button');
	}

	static search(query) {
		SeznamHome.searchBar().setValue(query);
		SeznamHome.searchButton().click();
	}
}
