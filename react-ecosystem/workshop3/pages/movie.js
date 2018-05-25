import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {fetchMovie} from '~/data/movies';
import MovieAction from '~/store/movieAction';
import DefaultTemplate from '~/ui/template/DefaultTemplate';
import MovieOrganism from '~/ui/organism/Movie';

export default connect(
  state => state,
)(class Movie extends React.PureComponent {
  static async getInitialProps({query, store}) {
    const movie = await fetchMovie(query.m);
    store.dispatch(MovieAction.fetchMovieDone(movie));
  }

  static propTypes = {
    movie: PropTypes.object,
  };

  render() {
    return (
      <DefaultTemplate query="">
        <Head>
          <title>{this.props.movie.title} | SFlix</title>
        </Head>

        <MovieOrganism movie={this.props.movie}/>
      </DefaultTemplate>
    );
  }
});
