import {createSelector, createStructuredSelector} from 'reselect';
import getterFactory from '~/store/getterFactory';
import DEFAULT_STATE, {NAMESPACE} from '~/ui/organism/movie/state';

const stateSelector = getterFactory(NAMESPACE, DEFAULT_STATE);
const movieSelector = createSelector(
  stateSelector,
  getterFactory('movie'),
);
const videoSelector = createSelector(
  movieSelector,
  getterFactory('video[0]'),
);
const isLoadingSelector = createSelector(
  stateSelector,
  getterFactory('isLoading'),
);
const lastErrorSelector = createSelector(
  stateSelector,
  getterFactory('lastError'),
);

export default createStructuredSelector({
  movie: movieSelector,
  video: videoSelector,
  isLoading: isLoadingSelector,
  lastError: lastErrorSelector,
});
