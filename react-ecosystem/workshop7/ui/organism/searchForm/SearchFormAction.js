import actionsEnumFactory from '~/store/actionsEnumFactory';
import {NAMESPACE} from '~/ui/organism/searchForm/state';

export default actionsEnumFactory(NAMESPACE,
  'SET_SEARCH_QUERY',
);
