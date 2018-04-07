import debounce from 'lodash.debounce';
import Router from 'next/router';
import PropTypes from 'prop-types';

const onLiveSearch = debounce(query => {
  Router.push({pathname: '/', query: query ? {q: query} : null});
}, 250);

function onQueryChange({target: {value}}) {
  onLiveSearch(value.trim());
}

export default function SearchForm({query}) {
  return (
    <form className="tpl-main-layout-search-form" action="/" method="get">
      <input
        className="tpl-main-layout-search-input"
        type="search"
        name="q"
        placeholder="Vyhledávání…"
        defaultValue={query}
        onChange={onQueryChange}
      />
      <button className="tpl-main-layout-search-button" type="submit">Hledat</button>
      <button className="tpl-main-layout-search-button" type="reset">Vymazat</button>
    </form>
  );
}

SearchForm.propTypes = {
  query: PropTypes.string.isRequired,
};
