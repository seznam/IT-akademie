import React, { PropTypes } from 'react';
import MainLayout from '../template/MainLayout.jsx';
import MovieListingOrganism from '../organism/MovieListing.jsx';

export default class MovieListing extends React.Component {

	static get propTypes() {
		return {
			location: PropTypes.shape({
				query: PropTypes.shape({
					q: PropTypes.string
				})
			})
		};
	}

	static get defaultProps() {
		return {
			location: {
				query: {}
			}
		};
	}

	render() {
		return (
			<MainLayout>
				<MovieListingOrganism query = { this.props.location.query.q }/>
			</MainLayout>
		);
	}
}
