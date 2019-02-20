import {createSelector, createStructuredSelector} from 'reselect';
import getterFactory from '~/store/getterFactory';
import DEFAULT_STATE, {NAMESPACE} from '~/ui/organism/searchForm/state';

const stateSelector = getterFactory(NAMESPACE, DEFAULT_STATE);
const querySelector = createSelector(
  stateSelector,
  getterFactory('query'),
);

export default createStructuredSelector({
  query: querySelector,
});
