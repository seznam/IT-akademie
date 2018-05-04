import createReducer from 'redux-create-fsa-reducer';
import MovieAction from '~/ui/organism/movie/MovieAction';
import DEFAULT_STATE from '~/ui/organism/movie/state';

export default createReducer(DEFAULT_STATE, {
  [MovieAction.FETCH_MOVIE](state) {
    return {
      ...state,
      isLoading: true,
    };
  },
  [MovieAction.FETCH_MOVIE_DONE](state, movie, error) {
    if (error) {
      return {
        ...state,
        isLoading: false,
        lastError: error,
      };
    }

    return {
      ...state,
      movie,
      isLoading: false,
      lastError: null,
    };
  },
  [MovieAction.RATE_MOVIE](state, {movie, rating}) {
    return {
      ...state,
      movie: {
        ...state.movie,
        rating,
      },
    };
  },
});
