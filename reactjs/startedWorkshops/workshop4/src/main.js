import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Movie from './page/Movie.jsx';
import MovieListing from './page/MovieListing.jsx';

ReactDOM.render(
	<Router history = { browserHistory }>
		<Route path = '/' component = { MovieListing }/>
		<Route path = '/film/:movieUrl' component = { Movie }/>
	</Router>,
	document.getElementById('root')
);
