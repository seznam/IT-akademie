import React from 'react';
import PropTypes from 'prop-types';
import Movie from '~/ui/molecule/Movie';

export default function MovieListingUI({movies}) {
  return (
    <ul className="atm-none ogm-movie-listing">
      {movies.map(movie =>
        <li key={movie.id}>
          <Movie movie={movie}/>
        </li>,
      )}
      <style jsx>{`
        .ogm-movie-listing {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </ul>
  );
}

MovieListingUI.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};
