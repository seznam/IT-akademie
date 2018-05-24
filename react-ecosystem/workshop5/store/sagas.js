import {call, fork, put, takeLatest} from 'redux-saga/effects';
import * as categoriesResource from '~/data/categories';
import * as movieResource from '~/data/movies';
import MovieAction from '~/store/movieAction';

export default function *rootSaga() {
  yield fork(moviesSaga);
  yield fork(movieSaga);
  yield fork(categoriesSaga);
}

function *moviesSaga() {
  yield takeLatest(MovieAction.fetchMovies, fetchMovies);
}

function *fetchMovies({payload: searchQuery}) {
  const movies = yield searchQuery ?
    call(movieResource.searchMovies, searchQuery)
    :
    call(movieResource.fetchMovies);
  yield put(MovieAction.fetchMoviesDone(movies));
}

function *movieSaga() {
  yield takeLatest(MovieAction.fetchMovie, fetchMovie);
}

function *fetchMovie({payload: movieUrl}) {
  const movie = yield call(movieResource.fetchMovie, movieUrl);
  yield put(MovieAction.fetchMovieDone(movie));
}

function *categoriesSaga() {
  yield takeLatest(MovieAction.fetchCategories, fetchCategories);
}

function *fetchCategories() {
  const categories = yield call(categoriesResource.fetchCategories);
  yield put(MovieAction.fetchCategoriesDone(categories));
}
