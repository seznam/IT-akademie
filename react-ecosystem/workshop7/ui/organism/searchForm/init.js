import SearchFormAction from '~/ui/organism/searchForm/SearchFormAction';

export default (dispatch, query, isServer) => {
  if (query.q) {
    dispatch(SearchFormAction.setSearchQuery(query.q));
  }
};
