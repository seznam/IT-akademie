import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Loader from '../Loader.jsx';
import { wrap } from 'react-stateless-wrapper';

describe('Loader component', () => {

	let loader = null;
	let root = null;
	let WrappedComponent = wrap(Loader);

	beforeEach(() => {
		loader = TestUtils.renderIntoDocument(
			<WrappedComponent
					mode = 'small'
					layout = 'center'
					className = 'userClass' />
		);
		root = ReactDOM.findDOMNode(loader);
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
