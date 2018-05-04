import MovieListingAction from '~/ui/organism/movieListing/MovieListingAction';

export default (dispatch, query, isServer) => {
  dispatch(MovieListingAction.fetchMovies(query.q));
};
