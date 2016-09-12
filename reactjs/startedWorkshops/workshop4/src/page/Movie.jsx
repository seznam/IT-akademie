import React, { PropTypes } from 'react';
import MainLayout from '../template/MainLayout.jsx';
import MovieOrganism from '../organism/Movie.jsx';

export default class Movie extends React.Component {

	static get propTypes() {
		return {
			params: PropTypes.shape({
				movieUrl: PropTypes.string
			})
		};
	}

	static get defaultProps() {
		return {
			params: {
				movieUrl: null
			}
		};
	}

	render() {
		return (
			<MainLayout>
				<MovieOrganism movieUrl = { this.props.params.movieUrl }/>
			</MainLayout>
		);
	}
}
