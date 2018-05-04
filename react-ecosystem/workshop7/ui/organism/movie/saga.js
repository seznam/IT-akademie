import {call, put, takeLatest} from 'redux-saga/effects';
import * as movieResource from '~/data/movies';
import MovieAction from '~/ui/organism/movie/MovieAction';

function *fetchMovie({payload: movieUrl}) {
  try {
    const movie = yield call(movieResource.fetchMovie, movieUrl);
    yield put(MovieAction.fetchMovieDone(movie));
  } catch (apiError) {
    yield put(MovieAction.fetchMovieDone(apiError));
  }
}

export default function *movieSaga() {
  yield takeLatest(MovieAction.FETCH_MOVIE, fetchMovie);
}
