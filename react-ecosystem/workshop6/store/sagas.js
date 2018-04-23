import {fork} from 'redux-saga/effects';
import movieSaga from '~/ui/organism/movie/saga';
import movieListingSaga from '~/ui/organism/movieListing/saga';

const SAGAS = [
  movieSaga,
  movieListingSaga,
];

export function *rootSaga() {
  for (const organismSaga of SAGAS) {
    yield fork(organismSaga);
  }
}
