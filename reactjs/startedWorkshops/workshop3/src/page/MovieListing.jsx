import React from 'react';
import MainLayout from '../template/MainLayout.jsx';
import MovieListingOrganism from '../organism/MovieListing.jsx';

export default class MovieListing extends React.Component {
	render() {
		return (
			<MainLayout>
				<MovieListingOrganism/>
			</MainLayout>
		);
	}
}
