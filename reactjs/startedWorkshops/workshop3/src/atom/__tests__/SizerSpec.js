import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Sizer from '../Sizer.jsx';

describe('Sizer component', () => {

	let root = null;

	beforeEach(() => {
		const sizerRef = React.createRef();
		TestUtils.renderIntoDocument(
			<Sizer
				width = {800}
				height = {500}
				placeholder = {true}
				className = 'userClass'
				ref={sizerRef}
			/>
		);
		root = ReactDOM.findDOMNode(sizerRef.current);
	});

	it('should render right sizer structure', () => {
		expect(root.tagName).toEqual('DIV');
		expect(root.classList.length).toEqual(3);
		expect(root.style.paddingTop).toEqual('62.5%');
	});
});
