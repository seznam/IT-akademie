import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import connectPage from '~/store/connectPage';
import DefaultTemplate from '~/ui/template/DefaultTemplate';
import MovieOrganism from '~/ui/organism/movie/Movie';

export default connectPage(class Movie extends React.PureComponent {
  static template = DefaultTemplate;
  static organisms = [
    MovieOrganism,
  ];

  static propTypes = {
    movie: PropTypes.shape({
      movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  render() {
    return [
      <Head key="head">
        <title>
          {this.props.movie.movie.title} | SFlix
        </title>
      </Head>,

      <MovieOrganism key="body"/>,
    ];
  }
});
