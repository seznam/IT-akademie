import createReducer from 'redux-create-fsa-reducer';
import MovieListingAction from '~/ui/organism/movieListing/MovieListingAction';
import DEFAULT_STATE from '~/ui/organism/movieListing/state';

export default createReducer(DEFAULT_STATE, {
  [MovieListingAction.movielistingFetchMovies](state) {
    return {
      ...state,
      isLoading: true,
    };
  },
  [MovieListingAction.movielistingFetchMoviesDone](state, movies, error) {
    if (error) {
      return {
        ...state,
        isLoading: false,
        lastError: error,
      };
    }

    return {
      ...state,
      movies,
      isLoading: false,
      lastError: null,
    };
  },
});
