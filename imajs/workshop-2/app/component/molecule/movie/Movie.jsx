import AbstractComponent from 'ima/page/AbstractComponent';
import React from 'react';
import PropTypes from 'prop-types';
import MovieEntity from 'app/model/movie/MovieEntity';
import { Image } from 'ima-ui-atoms';

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
          <a
            href={this.link('movie', { movieUrl: movie.url })}
            className="mol-movie-image">
            <Image
              className="mol-movie-image-img"
              src={movie.images[0].src}
              width={movie.images[0].width}
              height={movie.images[0].height}
              layout="responsive"
            />
          </a>
          <a
            href={this.link('movie', { movieUrl: movie.url })}
            className="mol-movie-title">
            <h2>{movie.title}</h2>
          </a>
          <p className="mol-movie-perex">{movie.perex}</p>
        </div>
      </article>
    );
  }
}
