import PropTypes from 'prop-types';
import Loader from '~/ui/atom/Loader';
import Rating from '~/ui/atom/Rating';
import Sizer from '~/ui/atom/Sizer';
import '~/ui/organism/movie.css';

export default function Movie({movie}) {
  if (!movie) {
    return <Loader mode="small" layout="center"/>;
  }

  return (
    <div className="ogm-movie">
      <div className="ogm-movie-video">
        <Sizer
          width={movie.video[0].width}
          height={movie.video[0].height}
        />
        <video className="ogm-movie-video-player" controls autoPlay>
          <source src={movie.video[0].src} type="video/mp4"/>
        </video>
      </div>
      <div className="ogm-movie-heading">
        <h1 className="ogm-movie-heading-text">{movie.title}</h1>
        <Rating rating={movie.rating}/>
      </div>
      <p>{movie.description}</p>
      <p>Hrají: {movie.actors.join(', ')}</p>
    </div>
  );
}

Movie.propTypes = {
  movie: PropTypes.object,
};
