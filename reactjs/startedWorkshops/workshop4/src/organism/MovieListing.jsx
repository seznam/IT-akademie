import PropTypes from 'prop-types';
import React from 'react';
import { uiComponentHelper } from '../UIComponentHelper';
import MovieModel from '../model/Movie';
import Movie from '../molecule/Movie.jsx';

export default class MovieListing extends React.Component {

	static get propTypes() {
		return {
			className: PropTypes.string
		};
	}

	static get defaultProps() {
		return {
			className: ''
		};
	}

	constructor(props) {
		super(props);

		this.state = {
			movies: []
		};

		this._movieModel = new MovieModel();
	}

	render() {
		let movies = this.state.movies;

		return (
			<div className = { uiComponentHelper.cssClasses({
				'ogm-movie-listing': true
			}, this.props.className) }>
				{movies.map(movie => <Movie key = { movie.id } movie = { movie }/>)}
			</div>
		);
	}

	componentDidMount() {
		this._mounted = true;

		this._movieModel.getMovies(this.props.query).then((movies) => {
			if (!this._mounted) {
				return;
			}

			this.setState({
				movies
			});
		});
	}

	componentWillUnmount() {
		this._mounted = false;
	}
}
