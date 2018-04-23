import MovieListingAction from '~/ui/organism/movieListing/MovieListingAction';

export default (dispatch, query, isServer) => {
  dispatch(MovieListingAction.movieListingFetchMovies(query.q));
};
