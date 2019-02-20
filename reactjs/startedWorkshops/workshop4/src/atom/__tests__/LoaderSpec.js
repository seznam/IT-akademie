import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Loader from '../Loader.jsx';

describe('Loader component', () => {

	let root = null;

	beforeEach(() => {
		const loaderRef = React.createRef();
		TestUtils.renderIntoDocument(
			<Loader
				mode = 'small'
				layout = 'center'
				className = 'userClass'
				ref={loaderRef}
			/>
		);
		root = ReactDOM.findDOMNode(loaderRef.current);
	});

	it('should render right loader structure', () => {
		expect(root.tagName).toEqual('DIV');
		expect(root.classList.length).toEqual(4);
	});

	it('should has five span for loader animation', () => {
		let spans = root.querySelectorAll('span');

		expect([...spans].length).toEqual(5);
	});
});
