describe('Seznamzpravy', () => {
	beforeEach(() => {
		browser.url('/');
	});

	it('can display homepage', () => {
		expect(browser.waitForExist('[data-e2e="ogm-header-big-logo"]')).toBeTruthy();
	});
});
