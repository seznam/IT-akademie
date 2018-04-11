import createReducer from 'redux-create-fsa-reducer';
import INITIAL_STATE from '~/store/initialState';
import MovieAction from '~/store/movieAction';

export default createReducer(INITIAL_STATE, {
  [MovieAction.fetchMoviesDone](state, movies) {
    return {
      ...state,
      movies,
    };
  },
  [MovieAction.fetchMovieDone](state, movie) {
    return {
      ...state,
      movie,
    };
  },
  [MovieAction.fetchCategoriesDone](state, categories) {
    return {
      ...state,
      categories,
    };
  },
  [MovieAction.setSearchQuery](state, searchQuery) {
    return {
      ...state,
      searchQuery,
    };
  },
});
