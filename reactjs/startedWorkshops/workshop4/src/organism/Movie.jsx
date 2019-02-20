import PropTypes from 'prop-types';
import React from 'react';
import { uiComponentHelper } from '../UIComponentHelper';
import Rating from '../atom/Rating.jsx';
import Sizer from '../atom/Sizer.jsx';
import MovieModel from '../model/Movie';

export default class Movie extends React.Component {

	static get propTypes() {
		return {
			movieUrl: PropTypes.string,
			className: PropTypes.string
		};
	}

	static get defaultProps() {
		return {
			movieUrl: null,
			className: ''
		};
	}

	constructor(props) {
		super(props);

		this.state = {
			movie: null
		};

		this._movieModel = new MovieModel();

		this._mounted = false;
	}

	render() {
		let movie = this.state.movie;

		if (!movie) {
			return null;
		}

		return (
			<div className = { uiComponentHelper.cssClasses({
				'ogm-movie': true
			}, this.props.className) }>
				<div className = 'ogm-movie-video'>
					<Sizer
						width = { movie.video[0].width }
						height = { movie.video[0].height }
						placeholder = { false }
					/>
					<video className = 'ogm-movie-video-player' controls autoPlay>
						<source src = { movie.video[0].src } type = 'video/mp4'/>
					</video>
				</div>
				<div className = 'ogm-movie-heading'>
					<h1 className = 'ogm-movie-heading-text'>{ movie.title }</h1>
					<Rating rating = { movie.rating }/>
				</div>
				<p>{ movie.description }</p>
				<p>Hrají: { movie.actors.join(', ') }</p>
			</div>
		);
	}

	componentDidMount() {
		this._mounted = true;

		if (!this.props.movieUrl) {
			return;
		}

		this._movieModel.getMovie(this.props.movieUrl).then((movie) => {
			if (!this._mounted) {
				return;
			}

			this.setState({
				movie
			});
		});
	}

	componentWillUnmount() {
		this._mounted = false;
	}
}
