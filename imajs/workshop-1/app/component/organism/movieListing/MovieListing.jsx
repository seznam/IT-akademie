import AbstractComponent from 'ima/page/AbstractComponent';
import React from 'react';
import PropTypes from 'prop-types';
import MovieEntity from 'app/model/movie/MovieEntity';
import Movie from 'app/component/molecule/movie/Movie';

export default class MovieListing extends AbstractComponent {

	static get propTypes() {
		return {
			className: PropTypes.string,
			movies: PropTypes.arrayOf(PropTypes.instanceOf(MovieEntity))
		};
	}

	static get defaultProps() {
		return {
			className: ''
		};
	}

	render() {
		let movies = this.props.movies || [];

		return (
			<div className={this.cssClasses({
				'ogm-movie-listing': true
			}, true)}>
				{movies.map(movie =>
					<Movie key={movie.id} movie={movie}/>
				)}
			</div>
		);
	}
}
