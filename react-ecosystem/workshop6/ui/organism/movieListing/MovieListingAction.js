import {createActions} from 'redux-actions';
import {NAMESPACE} from '~/ui/organism/movieListing/state';

export default createActions({},
  `${NAMESPACE}.FETCH_MOVIES`,
  `${NAMESPACE}.FETCH_MOVIES_DONE`,
);
