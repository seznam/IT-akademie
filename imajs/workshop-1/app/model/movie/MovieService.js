import MovieResource from 'app/model/movie/MovieResource';

export default class MovieService {
  static get $dependencies() {
    return [MovieResource];
  }

  /**
   * @param {MovieResource} resource
   */
  constructor(resource) {
    /**
     * @type {MovieResource}
     */
    this._resource = resource;

    if ($Debug) {
      Object.freeze(this);
    }
  }

  /**
   * @param {?string} query
   * @return {Promise<MovieEntity[]>}
   */
  getMovies(query = null) {
    return this._resource.getMovies(query);
  }

  /**
   * @param {string} url
   * @return {Promise<MovieEntity>}
   */
  getMovie(url) {
    return this._resource.getMovie(url);
  }
}
