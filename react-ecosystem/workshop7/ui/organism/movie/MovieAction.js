import actionsEnumFactory from '~/store/actionsEnumFactory';
import {NAMESPACE} from '~/ui/organism/movie/state';

export default actionsEnumFactory(NAMESPACE,
  'FETCH_MOVIE',
  'FETCH_MOVIE_DONE',
  'RATE_MOVIE',
);
