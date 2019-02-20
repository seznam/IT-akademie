import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
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
					<a className = 'mol-movie-image' href = { `/film/${movie.url}` }>
						<HtmlImage
							src = { movie.images[0].src }
							width = { movie.images[0].width }
							height = { movie.images[0].height }
							layout = 'responsive'
						/>
					</a>
					<a className = 'mol-movie-title' href = { `/film/${movie.url}` }>
						<h2 className = 'mol-movie-title-text'>{ movie.title }</h2>
					</a>
					<p className = 'mol-movie-perex'>
						{movie.perex}
					</p>
				</div>
			</article>
		);
	}
}
