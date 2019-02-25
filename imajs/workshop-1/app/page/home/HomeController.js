import Router from 'ima/router/Router';
import MovieService from 'app/model/movie/MovieService';
import AbstractPageController from 'app/page/AbstractPageController';

export default class HomeController extends AbstractPageController {
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
    return {
      movies: this._movieService.getMovies(this.params.q),
      query: this.params.q || ''
    };
  }

  onSearch({ query }) {
    this._router.redirect(this._router.link('home', { q: query }));
  }
}
