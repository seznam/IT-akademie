import UIComponentHelper from '../UIComponentHelper';

describe('UIComponentHelper', () => {

	let windowViewportRect = {
		top: 0,
		left: 0,
		width: 1024,
		height: 768
	};

	let elmRect = {
		top: -70,
		left: 462,
		width: 100,
		height: 100
	};

	let uiComponentHelper = null;

	beforeEach(() => {
		uiComponentHelper = new UIComponentHelper();
	});

	describe('getNumberFromRange method', function() {

		it('should return number from defined range', function() {
			expect(uiComponentHelper.getNumberFromRange(0, -1, 1)).toEqual(0);
		});

		it('should return defined min number from range', function() {
			expect(uiComponentHelper.getNumberFromRange(-1, 0, 1)).toEqual(0);
		});

		it('should return defined max number from range', function() {
			expect(uiComponentHelper.getNumberFromRange(2, 0, 1)).toEqual(1);
		});

	});

	describe('getRectsIntersection method', () => {

		it('should return intersecion rect from two defined rects', () => {
			let intersectionRect = uiComponentHelper.getRectsIntersection(windowViewportRect, elmRect);

			expect(intersectionRect.top).toEqual(windowViewportRect.top);
			expect(intersectionRect.left).toEqual(elmRect.left);
			expect(intersectionRect.width).toEqual(100);
			expect(intersectionRect.height).toEqual(30);
		});

	});

	describe('getPercentOfVisibility method', () => {

		it('should return percent of visibility on window viewport', () => {
			spyOn(uiComponentHelper, 'getWindowViewportRect')
				.and
				.returnValue(windowViewportRect);

			let percentOfVisibility = uiComponentHelper.getPercentOfVisibility(elmRect);

			expect(percentOfVisibility).toEqual(30);
		});

	});

	describe('getBoundingClientRect method', () => {

		it('throw error for undefined element', () => {
			expect(() => {
				uiComponentHelper.getBoundingClientRect();
			}).toThrow();
		});

		it('throw error for element without callable method getBoundingClientRect', () => {
			expect(() => {
				uiComponentHelper.getBoundingClientRect({});
			}).toThrow();
		});

		it('should returns expanded size for element', () => {
			let element = {
				getBoundingClientRect: () => elmRect
			};

			expect(uiComponentHelper.getBoundingClientRect(element, {}, 300)).toEqual({
				top: -370,
				left: 162,
				width: 700,
				height: 700
			});

			expect(function() {
				uiComponentHelper.getBoundingClientRect({});
			}).toThrow();
		});

	});

});
