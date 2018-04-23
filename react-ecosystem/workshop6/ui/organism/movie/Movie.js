import {connect} from 'react-redux';
import dispatchers from '~/ui/organism/movie/dispatchers';
import init from '~/ui/organism/movie/init';
import MovieUI from '~/ui/organism/movie/MovieUI';
import selectors from '~/ui/organism/movie/selectors';

const Movie = connect(
  selectors,
  dispatchers,
)(
  MovieUI,
);

Movie.init = init;

export default Movie;
