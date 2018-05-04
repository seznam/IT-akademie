import MovieAction from '~/ui/organism/movie/MovieAction';

export default dispatch => ({
  onRateMovie(movie, rating) {
    dispatch(MovieAction.rateMovie({movie, rating}));
  },
});
