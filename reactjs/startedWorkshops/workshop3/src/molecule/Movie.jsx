import React, { PropTypes } from 'react';
import { uiComponentHelper } from '../UIComponentHelper';
import HtmlImage from '../atom/HtmlImage.jsx';

export default class Movie extends React.Component {
	static get propTypes() {
		return {
			movie: PropTypes.object,
			className: PropTypes.string
		};
	}

	static get defaultProps() {
		return {
			movie: null,
			className: ''
		};
	}

	render() {
		return (
			<article className = { uiComponentHelper.cssClasses({
				'mol-movie': true
			}, this.props.className) }>
				<div className = 'mol-movie-content'>
					<a className = 'mol-movie-image' href = { `TODO: odkaz na /film/<url filmu>` }>
						TODO: HtmImage
					</a>
					<a className = 'mol-movie-title' href = { `TODO: odkaz na /film/<url filmu>` }>
						<h2 className = 'mol-movie-title-text'>TODO: title</h2>
					</a>
					<p className = 'mol-movie-perex'>
						TODO: perex
					</p>
				</div>
			</article>
		);
	}
}
