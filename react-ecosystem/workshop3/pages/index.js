import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import DefaultTemplate from '~/ui/template/DefaultTemplate';
import connectPage from '~/store/connectPage';
import MovieAction from '~/store/movieAction';
import {fetchCategories} from '~/data/categories';
import {fetchMovies, searchMovies} from '~/data/movies';
import MovieListing from '~/ui/organism/MovieListing';

export default connectPage(class Homepage extends React.PureComponent {
  static async getInitialProps({query, store}) {
    const searchQuery = query.q || '';
    const [categories, movies] = await Promise.all([
      fetchCategories(),
      searchQuery ? searchMovies(searchQuery) : fetchMovies(),
    ]);

    store.dispatch(MovieAction.setSearchQuery(searchQuery));
    store.dispatch(MovieAction.fetchMoviesDone(movies));
    store.dispatch(MovieAction.fetchCategoriesDone(categories));
  }

  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    movies: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired).isRequired,
  };

  render() {
    return (
      <DefaultTemplate query={this.props.searchQuery}>
        <Head>
          <title>
            SFlix
          </title>
        </Head>

        <MovieListing movies={this.props.movies}/>
      </DefaultTemplate>
    );
  }
});
