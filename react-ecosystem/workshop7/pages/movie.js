import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import getterFactory from '~/store/getterFactory';
import DefaultTemplate from '~/ui/template/DefaultTemplate';
import MovieOrganism from '~/ui/organism/movie/Movie';

export default connect(createStructuredSelector({
  movie: getterFactory('movie.movie'),
}))(class Movie extends React.PureComponent {
  static template = DefaultTemplate;
  static organisms = [
    MovieOrganism,
  ];

  static propTypes = {
    movie: PropTypes.object,
  };

  render() {
    const {title} = this.props.movie || {};

    return (
      <React.Fragment>
        <Head>
          <title>
            {title ? `${title} | ` : ''}SFlix
          </title>
        </Head>

        <MovieOrganism/>
      </React.Fragment>
    );
  }
});
