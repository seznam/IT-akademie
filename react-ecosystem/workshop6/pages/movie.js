import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import getterFactory from '~/store/getterFactory';
import DefaultTemplate from '~/ui/template/DefaultTemplate';
import MovieOrganism from '~/ui/organism/movie/Movie';

export default connect(
  getterFactory('movie.movie'),
)(class Movie extends React.PureComponent {
  static template = DefaultTemplate;
  static organisms = [
    MovieOrganism,
  ];

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>
            {this.props.title} | SFlix
          </title>
        </Head>

        <MovieOrganism/>
      </React.Fragment>
    );
  }
});
