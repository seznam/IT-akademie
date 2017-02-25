import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
//import Sizer from '../Sizer.jsx';
import HtmlImage from '../HtmlImage.jsx';

describe('HtmlImage component', () => {

	describe('responsive layout', () => {

		let htmlImage = null;
		let root = null;

		beforeEach(() => {
			htmlImage = TestUtils.renderIntoDocument(
				<HtmlImage
						src = '//upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg'
						width = {600}
						height = {400}
						layout = 'responsive'
						className = 'userClass' />
			);
			root = ReactDOM.findDOMNode(htmlImage);
		});

		it('should render right loader structure', () => {
			expect(root.tagName).toEqual("DIV");
			expect(root.classList.length).toEqual(4);
			expect(root.style.width).toEqual('');
			expect(root.style.height).toEqual('');
		});

	});

});
