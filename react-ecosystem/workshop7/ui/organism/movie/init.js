import MovieAction from '~/ui/organism/movie/MovieAction';

export default (dispatch, query, isServer) => {
  dispatch(MovieAction.fetchMovie(query.m));
};
