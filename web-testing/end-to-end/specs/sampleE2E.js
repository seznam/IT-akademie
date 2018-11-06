describe('Seznam', () => {
	beforeEach(() => {
		browser.url('/');
	});

	it('can search for www.seznamzpravy.cz', () => {
		browser.setValue('.input--hp-search', 'www.seznamzpravy.cz');
		browser.click('.search-form__button');

		browser.waitForExist('.Result-title');

		browser.click('.Result-title');

		expect(browser.getTitle()).toEqual('Seznam Zprávy');
	});

	it('can display message when no search results found', () => {
		browser.setValue('.input--hp-search', 'kjuifhcaiscdshklisfdgfjasbkjsk');
		browser.click('.search-form__button');

		browser.waitForExist('.SimpleResult-title');

		expect(browser.getText('.SimpleResult-title')).toEqual('Bohužel jsem nic nenašel');
	});
});
