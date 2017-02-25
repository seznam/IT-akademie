import React from 'react';
import { shallow } from 'enzyme';
import HtmlImage from '../HtmlImage';
import Sizer from '../Sizer';
import Loader from '../Loader';

describe('HtmlImage component', () => {

	const WIDTH = 16;
	const HEIGHT = 9;
	const SRC = 'url';
	const ALT = 'alt';

	let wrapper = null;

	beforeEach(() => {
		wrapper = shallow(<HtmlImage />);
	});

	describe('responsive layout', () => {

		beforeEach(() => {
			wrapper.setProps({
				src: SRC,
				alt: ALT,
				width: WIDTH,
				height: HEIGHT,
				layout: 'responsive'
			});
		});

		it('should have defined class atm-image, atm-overflow and atm-responsive', () => {
			expect(wrapper.hasClass('atm-image')).toBeTruthy();
			expect(wrapper.hasClass('atm-overflow')).toBeTruthy();
			expect(wrapper.hasClass('atm-responsive')).toBeTruthy();
		});

		it('should have undefined css rules width and heigh', () => {
			expect(wrapper.get(0).props.style).toEqual(null);
		});

		it('should have rendered right Sizer component', () => {
			let { width, height, placeholder } = wrapper.find(Sizer).props();

			expect(width).toEqual(WIDTH);
			expect(height).toEqual(HEIGHT);
			expect(placeholder).toBeTruthy();
		});

	});

	describe('loading phrase', () => {

		beforeEach(() => {
			wrapper.setProps({
				src: SRC,
				alt: ALT,
				width: WIDTH,
				height: HEIGHT,
				layout: 'responsive'
			});
		});

		it('should have rendered Loader component', () => {
			wrapper.setState({ noloading: false });

			expect(!wrapper.find(Loader).isEmpty()).toBeTruthy();
		});

		it('should have rendered Loader component', () => {
			wrapper.setState({ noloading: true, visibleInViewport: true });

			let { src, alt } = wrapper.find('img').props();

			expect(src).toEqual(SRC);
			expect(alt).toEqual(ALT);
		});

	});

});
