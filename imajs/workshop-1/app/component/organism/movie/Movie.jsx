import AbstractComponent from 'ima/page/AbstractComponent';
import React from 'react';
import PropTypes from 'prop-types';
import Rating from 'app/component/atom/rating/Rating';
import MovieEntity from 'app/model/movie/MovieEntity';

export default class Movie extends AbstractComponent {
  static get propTypes() {
    return {
      className: PropTypes.string,
      movie: PropTypes.instanceOf(MovieEntity)
    };
  }

  static get defaultProps() {
    return {
      className: ''
    };
  }

  render() {
    let movie = this.props.movie;
    if (!movie) {
      return null;
    }

    return (
      <div
        className={this.cssClasses(
          {
            'ogm-movie': true
          },
          true
        )}>
        <div className="ogm-movie-video">
          <video
            className="ogm-movie-video-player ogm-movie-video-player-native"
            controls
            autoPlay>
            <source src={movie.video[0].src} type="video/mp4" />
          </video>
        </div>
        <div className="ogm-movie-heading">
          <h1 className="ogm-movie-heading-text">{movie.title}</h1>
          <Rating rating={movie.rating} />
        </div>
        <p>{movie.description}</p>
        <p>Hrají: {movie.actors.join(', ')}</p>
      </div>
    );
  }
}
