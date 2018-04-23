import {combineReducers} from 'redux';
import movieReducer from '~/ui/organism/movie/reducer';
import {NAMESPACE as movieNamespace} from '~/ui/organism/movie/state';
import movieListingReducer from '~/ui/organism/movieListing/reducer';
import {NAMESPACE as movieListingNamespace} from '~/ui/organism/movieListing/state';
import searchFormReducer from '~/ui/organism/searchForm/reducer';
import {NAMESPACE as searchFormNamespace} from '~/ui/organism/searchForm/state';

export default combineReducers({
  [movieNamespace]: movieReducer,
  [movieListingNamespace]: movieListingReducer,
  [searchFormNamespace]: searchFormReducer,
});
