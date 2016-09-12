import React, { PropTypes } from 'react';
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
	}

	render() {
		// TODO .ogm-movie-listing
		return null
	}
}
