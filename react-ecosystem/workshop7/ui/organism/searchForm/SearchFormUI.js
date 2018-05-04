import debounce from 'lodash.debounce';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import '~/ui/organism/searchForm/searchForm.css';

const onLiveSearch = debounce(query => {
  Router.push({pathname: '/', query: query ? {q: query} : null});
}, 250);

function onQueryChange({target: {value}}) {
  onLiveSearch(value.trim());
}

export default function SearchFormUI({query}) {
  return (
    <form className="ogm-main-layout-search-form" action="/" method="get">
      <input
        className="ogm-main-layout-search-input"
        type="search"
        name="q"
        placeholder="Vyhledávání…"
        defaultValue={query}
        onChange={onQueryChange}
      />
      <button className="ogm-main-layout-search-button" type="submit">Hledat</button>
      <button className="ogm-main-layout-search-button" type="reset">Vymazat</button>
    </form>
  );
}

SearchFormUI.propTypes = {
  query: PropTypes.string.isRequired,
};
