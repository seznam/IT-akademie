import React from 'react';
import NextApp, {Container} from 'next/app';
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import storeFactory from '~/store/storeFactory';

class App extends NextApp {
  static async getInitialProps({Component, ctx}) {
    let pageProps;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    } else {
      pageProps = {};
    }

    return {pageProps};
  }

  render() {
    const {Component, pageProps, store} = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps}/>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(storeFactory)(withReduxSaga(App));
