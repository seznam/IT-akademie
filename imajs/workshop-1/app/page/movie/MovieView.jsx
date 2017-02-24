import AbstractComponent from 'ima/page/AbstractComponent';
import React, { PropTypes } from 'react';
import MainLayout from 'app/component/template/mainLayout/MainLayout';
import Movie from 'app/component/organism/movie/Movie';
import MovieEntity from 'app/model/movie/MovieEntity';

export default class MovieView extends AbstractComponent {

	static get contextTypes() {
		return {
			$Utils: PropTypes.object
		};
	}

	static get propTypes() {
		return {
			movie: PropTypes.instanceOf(MovieEntity)
		}
	}

	render() {
		return (
			<MainLayout className="l-movie">
				<Movie movie={this.props.movie}/>
			</MainLayout>
		);
	}
}
