import {createActions} from 'redux-actions';
import {NAMESPACE} from '~/ui/organism/movie/state';

export default createActions({},
  `${NAMESPACE}.FETCH_MOVIE`,
  `${NAMESPACE}.FETCH_MOVIE_DONE`,
  `${NAMESPACE}.RATE_MOVIE`,
);
