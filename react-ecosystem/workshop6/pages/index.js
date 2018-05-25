import Head from 'next/head';
import React from 'react';
import DefaultTemplate from '~/ui/template/DefaultTemplate';
import MovieListing from '~/ui/organism/movieListing/MovieListing';

export default class Homepage extends React.PureComponent {
  static template = DefaultTemplate;
  static organisms = [
    MovieListing,
  ];

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>
            SFlix
          </title>
        </Head>

        <MovieListing/>
      </React.Fragment>
    );
  }
}
