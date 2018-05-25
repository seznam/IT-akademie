import Link from 'next/link';
import PropTypes from 'prop-types';
import SmartImage from '~/ui/atom/SmartImage';
import '~/ui/molecule/movie.css';

export default function Movie({movie}) {
  return (
    <article className="mol-movie">
      <div className="mol-movie-content">
        <Link href={{pathname: '/movie', query: {m: movie.url}}} prefetch>
          <a className="mol-movie-image">
            <SmartImage
              src={movie.images[0].src}
              width={movie.images[0].width}
              height={movie.images[0].height}
              layout="responsive"
            />
          </a>
        </Link>
        <Link href={{pathname: '/movie', query: {m: movie.url}}} prefetch>
          <a className="mol-movie-title">
            <h2 className="mol-movie-title-text">{movie.title}</h2>
          </a>
        </Link>
        <p className="mol-movie-perex">
          {movie.perex}
        </p>
      </div>
    </article>
  );
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
};
