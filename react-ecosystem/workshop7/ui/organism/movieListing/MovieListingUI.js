import React from 'react';
import PropTypes from 'prop-types';
import Movie from '~/ui/molecule/Movie';
import '~/ui/organism/movieListing/movieListing.css';

export default function MovieListingUI({movies}) {
  return (
    <ul className="atm-none ogm-movie-listing">
      {movies.map(movie =>
        <li key={movie.id}>
          <Movie movie={movie}/>
        </li>,
      )}
    </ul>
  );
}

MovieListingUI.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};
