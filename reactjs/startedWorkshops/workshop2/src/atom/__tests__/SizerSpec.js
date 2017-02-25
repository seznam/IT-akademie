import React from 'react';
import { shallow } from 'enzyme';
import Sizer from '../Sizer';

describe('Sizer component', () => {

	let wrapper = null;

	beforeEach(() => {
		wrapper = shallow(<Sizer />);
	});

	it('should set atm-sizer class', () => {
		expect(wrapper.hasClass('atm-sizer')).toBeTruthy();
	});

	it('should set atm-placeholder class if is defined placeholder props', () => {
		wrapper.setProps({ placeholder: true });

		expect(wrapper.hasClass('atm-placeholder')).toBeTruthy();
	});

	it('should calculate ratio between width and height', () => {
		wrapper.setProps({
			width: 16,
			height: 9
		});

		expect(wrapper.get(0).props.style.paddingTop).toEqual('56.25%');
	});

});
