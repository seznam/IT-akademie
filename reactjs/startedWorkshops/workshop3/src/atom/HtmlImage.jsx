import React, { PropTypes } from 'react';
import Loader from './Loader.jsx';
import Sizer from './Sizer.jsx';
import { uiComponentHelper } from '../UIComponentHelper';

const EXTENDED_PADDING = 300;

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

		this.state = {
			noloading: false,
			visibleInViewport: false
		};

		this._mounted = false;
		this._throttledCheckVisibility = uiComponentHelper.throttle(
			this._checkVisibility,
			333,
			this
		);
	}

	componentDidMount() {
		this._mounted = true;
		this._bindEventListeners();
		this._checkVisibility();
	}

	componentWillUnmount() {
		this._mounted = false;
		this._unbindEventListeners();
	}

	render() {
		return (
			<div
					ref = 'root'
					className = { uiComponentHelper.cssClasses({
						'atm-image': true,
						'atm-overflow': true,
						'atm-responsive': this.props.layout === 'responsive'
					}, this.props.className) }
					style = {this.props.layout !== 'responsive' ?
						{
							width: this.props.width || 'auto',
							height: this.props.height || 'auto'
						}
					:
						null
					}>
				{this.props.layout === 'responsive' ?
					<Sizer
							width = { this.props.width }
							height = { this.props.height }
							placeholder = { !this.state.noloading }/>
				:
					null
				}
				{this.state.noloading ?
					<img
							src = { this.props.src }
							alt = { this.props.alt }
							className = { uiComponentHelper.cssClasses({
								'atm-fill': true,
								'atm-loaded': this.state.noloading && this.state.visibleInViewport
							}) }/>
				:
					<Loader mode = 'small' layout = 'center'/>
				}
			</div>
		);
	}

	_unbindEventListeners() {
		uiComponentHelper.unbindEventListener(window, 'resize', this._throttledCheckVisibility);
		uiComponentHelper.unbindEventListener(window, 'scroll', this._throttledCheckVisibility);
	}

	_bindEventListeners() {
		uiComponentHelper.bindEventListener(window, 'resize', this._throttledCheckVisibility);
		uiComponentHelper.bindEventListener(window, 'scroll', this._throttledCheckVisibility);
	}

	_checkVisibility() {
		if (!this._mounted) {
			return;
		}

		let rootElement = this.refs.root;
		let rootElementRect = uiComponentHelper.getBoundingClientRect(
			rootElement,
			{ width: this.props.width, height: this.props.height },
			EXTENDED_PADDING
		);

		if (
			this.state.visibleInViewport === false &&
			uiComponentHelper.getPercentOfVisibility(rootElementRect) > 0
		) {
			this._preLoadImage();
			this._unbindEventListeners();
			this.setState({ visibleInViewport: true });
		}
	}

	_preLoadImage() {
		let image = new Image();

		image.onload = () => {
			if (this._mounted) {
				this.setState({ noloading: true });
			}
		};
		image.onerror = () => {
			if (this._mounted) {
				this.setState({ noloading: true });
			}
		};

		if (this.props.src) {
			image.src = this.props.src;
		} else {
			if (this._mounted) {
				this.setState({ noloading: true });
			}
		}
	}
}
