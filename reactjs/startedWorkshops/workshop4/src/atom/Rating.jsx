import React, { PropTypes } from 'react';
import { uiComponentHelper } from '../UIComponentHelper';

const STARS_COUNT = 5;

export default class Rating extends React.Component {

	static get propTypes() {
		return {
			rating: PropTypes.number,
			className: PropTypes.string
		};
	}

	static get defaultProps() {
		return {
			rating: 0,
			className: ''
		};
	}

	render() {
		// TODO: .atm-rating
		return null;
	}
}
