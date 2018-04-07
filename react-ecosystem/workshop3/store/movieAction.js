import {createActions} from 'redux-actions';

export default createActions({},
  'FETCH_MOVIES_DONE',
  'FETCH_MOVIE_DONE',
  'FETCH_CATEGORIES_DONE',
  'SET_SEARCH_QUERY',
);
