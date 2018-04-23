import {connect} from 'react-redux';
import init from '~/ui/organism/movieListing/init';
import MovieListingUI from '~/ui/organism/movieListing/MovieListingUI';
import selectors from '~/ui/organism/movieListing/selectors';

const MovieListing = connect(
  selectors,
)(
  MovieListingUI,
);

MovieListing.init = init;

export default MovieListing;
