import React from 'react';
import PropTypes from 'prop-types';
import Loader from '~/ui/atom/Loader';
import Rating from '~/ui/atom/Rating';
import Sizer from '~/ui/atom/Sizer';
import '~/ui/organism/movie/movie.css';

export default function MovieUI({isLoading, movie, video, onRateMovie}) {
  if (isLoading) {
    return <Loader mode="small" layout="center"/>;
  }

  return (
    <div className="ogm-movie">
      <div className="ogm-movie-video">
        <Sizer
          width={video.width}
          height={video.height}
        />
        <video className="ogm-movie-video-player" controls autoPlay>
          <source src={video.src} type="video/mp4"/>
        </video>
      </div>
      <div className="ogm-movie-heading">
        <h1 className="ogm-movie-heading-text">{movie.title}</h1>
        <Rating rating={movie.rating} onRate={rating => onRateMovie(movie, rating)}/>
      </div>
      <p>{movie.description}</p>
      <p>Hrají: {movie.actors.join(', ')}</p>
    </div>
  );
}

MovieUI.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }),
  video: PropTypes.shape({
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  onRateMovie: PropTypes.func.isRequired,
};
