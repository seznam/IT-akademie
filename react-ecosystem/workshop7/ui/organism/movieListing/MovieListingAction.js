import actionsEnumFactory from '~/store/actionsEnumFactory';
import {NAMESPACE} from '~/ui/organism/movieListing/state';

export default actionsEnumFactory(NAMESPACE,
  'FETCH_MOVIES',
  'FETCH_MOVIES_DONE',
);
