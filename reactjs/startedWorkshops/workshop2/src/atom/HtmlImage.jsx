import React, { PropTypes } from 'react';
import Loader from './Loader.jsx';
import Sizer from './Sizer.jsx';
import { uiComponentHelper } from '../UIComponentHelper';

/**
 * Html image
 *
 * @class HtmlImage
 */
export default class HtmlImage extends React.Component {

	static get propTypes() {
		return {
			src: PropTypes.string.isRequired,
			width: PropTypes.number,
			height: PropTypes.number,
			layout: PropTypes.string,
			alt: PropTypes.string,
			className: PropTypes.string
		};
	}

	static get defaultProps() {
		return {
			src: null,
			width: null,
			height: null,
			layout: null,
			alt: null,
			className: ''
		};
	}

	constructor(props) {
		super(props);

		//TODO
	}

	componentDidMount() {
		//TODO
	}

	componentWillUnmount() {
		//TODO
	}

	render() {
		return null;
	}

	_preLoadImage() {
		let image = new Image();

		image.onload = () => {
			//TODO
		};
		image.onerror = () => {
			//TODO
		};

		if (this.props.src) {
			image.src = this.props.src;
		}
	}
}
