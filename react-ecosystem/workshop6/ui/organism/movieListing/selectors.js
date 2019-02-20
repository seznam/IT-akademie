import {createSelector, createStructuredSelector} from 'reselect';
import getterFactory from '~/store/getterFactory';
import DEFAULT_STATE, {NAMESPACE} from '~/ui/organism/movieListing/state';

const stateSelector = getterFactory(NAMESPACE, DEFAULT_STATE);
const moviesSelector = createSelector(
  stateSelector,
  getterFactory('movies'),
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
  movies: moviesSelector,
  isLoading: isLoadingSelector,
  lastError: lastErrorSelector,
});
