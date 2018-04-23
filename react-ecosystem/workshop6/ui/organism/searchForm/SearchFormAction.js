import {createActions} from 'redux-actions';
import {NAMESPACE} from '~/ui/organism/searchForm/state';

export default createActions({},
  `${NAMESPACE}.SET_SEARCH_QUERY`,
);
