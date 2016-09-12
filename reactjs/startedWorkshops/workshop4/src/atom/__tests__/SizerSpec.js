import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Sizer from '../Sizer.jsx';
import { wrap } from 'react-stateless-wrapper';

describe('Sizer component', () => {

	let sizer = null;
	let root = null;
	let WrappedComponent = wrap(Sizer);

	beforeEach(() => {
		sizer = TestUtils.renderIntoDocument(
			<WrappedComponent
					width = {800}
					height = {500}
					placeholder = {true}
					className = 'userClass'/>
		);
		root = ReactDOM.findDOMNode(sizer);
	});

	it('should render right sizer structure', () => {
		expect(root.tagName).toEqual('DIV');
		expect(root.classList.length).toEqual(3);
		expect(root.style.paddingTop).toEqual('62.5%');
	});
});
