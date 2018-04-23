import {connect} from 'react-redux';
import SearchFormUI from '~/ui/organism/searchForm/SearchFormUI';
import selectors from '~/ui/organism/searchForm/selectors';

const SearchForm = connect(
  selectors,
)(
  SearchFormUI,
);

SearchForm.init = null;

export default SearchForm;
