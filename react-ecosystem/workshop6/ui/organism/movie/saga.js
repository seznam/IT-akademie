import {call, put, takeLatest} from 'redux-saga/effects';
import * as movieResource from '~/data/movies';
import MovieAction from '~/ui/organism/movie/MovieAction';

function *fetchMovie({payload: movieUrl}) {
  try {
    const movie = yield call(movieResource.fetchMovie, movieUrl);
    yield put(MovieAction.movieFetchMovieDone(movie));
  } catch (apiError) {
    yield put(MovieAction.movieFetchMovieDone(apiError));
  }
}

export default function *movieSaga() {
  yield takeLatest(MovieAction.movieFetchMovie, fetchMovie);
}
