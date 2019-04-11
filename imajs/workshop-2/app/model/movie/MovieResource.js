import HttpAgent from 'ima/http/HttpAgent';
import AbstractResource from 'app/model/AbstractResource';
import MovieEntity from 'app/model/movie/MovieEntity';
import MovieFactory from 'app/model/movie/MovieFactory';

export default class MovieResource extends AbstractResource {
  static get $dependencies() {
    return [HttpAgent, 'REST_API_BASE_URL', MovieFactory];
  }

  /**
   * @param {?string} query
   * @return {Promise<MovieEntity[]>}
   */
  getMovies(query = null) {
    if (query) {
      query = query.toLowerCase();
    }

    let url = `${this._baseUrl}/movies.json`;
    return this._httpAgent.get(url, {}).then(response => {
      let data = response.body;
      return this._entityFactory.createEntities(
        data.filter(movieData => matchesQuery(movieData))
      );
    });

    function matchesQuery(movie) {
      if (!query) {
        return true;
      }

      return (
        movie.title.toLowerCase().indexOf(query) > -1 ||
        movie.perex.toLowerCase().indexOf(query) > -1 ||
        movie.description.toLowerCase().indexOf(query) > -1
      );
    }
  }

  /**
   * @param {string} url
   * @return {Promise<MovieEntity>}
   */
  async getMovie(url) {
    const movies = await this.getMovies();
    const movie = movies.filter(movie => movie.url === url);
    return movie.length ? movie[0] : null;
  }
}
