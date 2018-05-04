import {call, put, takeLatest} from 'redux-saga/effects';
import * as movieResource from '~/data/movies';
import MovieListingAction from '~/ui/organism/movieListing/MovieListingAction';

function *fetchMovies({payload: searchQuery}) {
  try {
    const movies = yield searchQuery ?
      call(movieResource.searchMovies, searchQuery)
      :
      call(movieResource.fetchMovies);
    yield put(MovieListingAction.fetchMoviesDone(movies));
  } catch (apiError) {
    yield put(MovieListingAction.fetchMoviesDone(apiError));
  }
}

export default function *movieListingSaga() {
  yield takeLatest(MovieListingAction.FETCH_MOVIES, fetchMovies);
}
