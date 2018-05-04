import createReducer from 'redux-create-fsa-reducer';
import DEFAULT_STATE from '~/ui/organism/searchForm/state';
import SearchFormAction from '~/ui/organism/searchForm/SearchFormAction';

export default createReducer(DEFAULT_STATE, {
  [SearchFormAction.SET_SEARCH_QUERY](state, query) {
    return {
      ...state,
      query,
    };
  },
});
