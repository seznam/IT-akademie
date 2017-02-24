import AbstractComponent from 'ima/page/AbstractComponent';
import React, { PropTypes } from 'react';
import MovieListing from 'app/component/organism/movieListing/MovieListing';
import MainLayout from 'app/component/template/mainLayout/MainLayout';
import MovieEntity from 'app/model/movie/MovieEntity';

export default class HomeView extends AbstractComponent {

	static get contextTypes() {
		return {
			$Utils: PropTypes.object
		};
	}

	static get propTypes() {
		return {
			movies: PropTypes.arrayOf(PropTypes.instanceOf(MovieEntity)),
			query: PropTypes.string
		}
	}

	render() {
		return (
			<MainLayout className='l-homepage' query={this.props.query}>
				<MovieListing movies={this.props.movies}/>
			</MainLayout>
		);
	}
}
