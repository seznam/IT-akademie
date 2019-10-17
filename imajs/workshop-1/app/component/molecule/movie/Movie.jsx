import AbstractComponent from 'ima/page/AbstractComponent';
import React from 'react';
import PropTypes from 'prop-types';
import MovieEntity from 'app/model/movie/MovieEntity';

export default class Movie extends AbstractComponent {
  static get propTypes() {
    return {
      movie: PropTypes.instanceOf(MovieEntity),
      className: PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      movie: null,
      className: ''
    };
  }

  render() {
    let movie = this.props.movie;
    if (!movie) {
      return null;
    }

    return (
      <article
        className={this.cssClasses(
          {
            'mol-movie': true
          },
          true
        )}>
        <div className="mol-movie-content">
          {
            // WORKSHOP: implement
            /*
					a[class="mol-movie-image"][href=link:movie{movieUrl=movie.url}]
					 */
          }
          <a className="mol-movie-image" href={this.link('movie', {movieUrl: movie.url})}>
            <img
              className="mol-movie-image-img"
              src={movie.images[0].src}
              width={movie.images[0].width}
              height={movie.images[0].height}
            />
          </a>
          {
            // WORKSHOP: implement
            /*
					/a
					a[class="mol-movie-title"][href=link:movie{movieUrl=movie.url}]
						h2[class="mol-movie-title-text"]
							movie.title
					 */
          }
          <a className="mol-movie-title" href={this.link('movie', {movieUrl: movie.url})}>
            <h2 className='mol-movie-title-text'>{movie.title}</h2>
          </a>
          <p className="mol-movie-perex">{movie.perex}</p>
        </div>
      </article>
    );
  }
}
