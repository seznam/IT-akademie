import SeznamHome from './pages/SeznamHome';
import SeznamSearchResults from './pages/SeznamSearchResults';

describe('Seznam', () => {
	beforeEach(() => {
		browser.url('/');
	});

	it('can search for www.seznamzpravy.cz', () => {
		SeznamHome.search('www.seznamzpravy.cz');

		SeznamSearchResults.resultTitle().waitForExist();

		SeznamSearchResults.resultTitle().click();

		expect(browser.getTitle()).toEqual('Seznam Zprávy');
	});

	it('can display message when no search results found', () => {
		SeznamHome.search('kjuifhcaiscdshklisfdgfjasbkjsk');

		SeznamSearchResults.nothingFoundTitle().waitForExist();

		expect(SeznamSearchResults.nothingFoundTitle().getText())
			.toEqual('Bohužel jsem nic nenašel');
	});
});
