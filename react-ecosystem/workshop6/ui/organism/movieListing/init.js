import MovieListingAction from '~/ui/organism/movieListing/MovieListingAction';

export default (dispatch, query, isServer) => {
  dispatch(MovieListingAction.movielistingFetchMovies(query.q));
};
