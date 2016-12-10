import Router from 'ima/router/Router';
import MovieService from 'app/model/movie/MovieService'
import AbstractPageController from 'app/page/AbstractPageController';

export default class MovieController extends AbstractPageController {

	static get $dependencies() {
		return [Router, MovieService];
	}

	/**
	 * @param {Router} router
	 * @param {MovieService} movieService
	 */
	constructor(router, movieService) {
		super();

		/**
		 * @type {Router}
		 */
		this._router = router;

		/**
		 * @type {MovieService}
		 */
		this._movieService = movieService;
	}

	load() {
		// WORKSHOP: implement
		/*
		return
			movie: getMovie by movieUrl parameter using movieService
		 */
	}

	onSearch({ query }) {
		this._router.redirect(this._router.link('home', { q: query }));
	}
}
