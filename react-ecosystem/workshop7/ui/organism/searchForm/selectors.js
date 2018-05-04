import {createSelector, createStructuredSelector} from 'reselect';
import getterFactory from '~/store/getterFactory';
import {NAMESPACE} from '~/ui/organism/searchForm/state';

const stateSelector = getterFactory(NAMESPACE);
const querySelector = createSelector(
  stateSelector,
  getterFactory('query'),
);

export default createStructuredSelector({
  query: querySelector,
});
