import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import {fetchMovie} from '~/data/movies';
import DefaultTemplate from '~/ui/template/DefaultTemplate';
import MovieOrganism from '~/ui/organism/Movie';

export default class Movie extends React.PureComponent {
  static async getInitialProps({query}) {
    return {
      movie: await fetchMovie(query.m),
    };
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
}
