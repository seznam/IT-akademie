import Head from 'next/head';
import React from 'react';
import DefaultTemplate from '~/ui/template/DefaultTemplate';
import connectPage from '~/store/connectPage';
import MovieListing from '~/ui/organism/movieListing/MovieListing';

export default connectPage(class Homepage extends React.PureComponent {
  static template = DefaultTemplate;
  static organisms = [
    MovieListing,
  ];

  render() {
    return [
      <Head key="head">
        <title>
          SFlix
        </title>
      </Head>,

      <MovieListing key="body"/>,
    ];
  }
});
