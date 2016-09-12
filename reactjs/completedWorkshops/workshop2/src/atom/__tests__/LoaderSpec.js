import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../Loader';

describe('Loader component', () => {

	let wrapper = null;

	beforeEach(() => {
		wrapper = shallow(<Loader />);
	});

	it('should set atm-loader class', () => {
		expect(wrapper.hasClass('atm-loader')).toBeTruthy();
	});

	it('should set atm-placeholder class if is defined placeholder props', () => {
		wrapper.setProps({ mode: 'small', layout: 'center' });

		expect(wrapper.hasClass('atm-loader-small')).toBeTruthy();
		expect(wrapper.hasClass('atm-loader-center')).toBeTruthy();
	});

	it('should calculate ratio between width and height', () => {
		expect(wrapper.get(0).props.children.length).toEqual(5);
	});

});
