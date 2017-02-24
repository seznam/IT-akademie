import Router from 'ima/router/Router';
import RouteNames from 'ima/router/RouteNames';
import ErrorController from 'app/page/error/ErrorController';
import ErrorView from 'app/page/error/ErrorView';
import HomeController from 'app/page/home/HomeController';
import HomeView from 'app/page/home/HomeView';
import MovieController from 'app/page/movie/MovieController';
import MovieView from 'app/page/movie/MovieView';
import NotFoundController from 'app/page/notFound/NotFoundController';
import NotFoundView from 'app/page/notFound/NotFoundView';

export let init = (ns, oc, config) => {
	let router = oc.get(Router);

	router
		.add('home', '/', HomeController, HomeView)
		.add('movie', '/film/:movieUrl', MovieController, MovieView)
		.add(RouteNames.ERROR, '/error', ErrorController, ErrorView)
		.add(RouteNames.NOT_FOUND, '/not-found', NotFoundController, NotFoundView);

};
