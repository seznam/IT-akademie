import React from 'react';
import NextApp, {Container} from 'next/app';
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import storeFactory from '~/store/storeFactory';

const EMPTY_ARRAY = [];
// The page components do not change during runtime, there is no reason to use a WeakMap here.
const pageOrganismsCache = new Map();

class App extends NextApp {
  static async getInitialProps({Component, ctx}) {
    for (const organism of this._getPageOrganisms(Component).values()) {
      if (organism.init) {
        organism.init(ctx.store.dispatch, ctx.query, !!ctx.req);
      }
    }

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
    const Template = Component.template;

    return (
      <Container>
        <Provider store={store}>
          {Template ?
            <Template>
              <Component {...pageProps}/>
            </Template>
            :
            <Component {...pageProps}/>
          }
        </Provider>
      </Container>
    );
  }

  static _getPageOrganisms(Component) {
    if (pageOrganismsCache.has(Component)) {
      return pageOrganismsCache.get(Component);
    }

    const Template = Component.template;
    const templateOrganisms = (Template && Template.organisms) || EMPTY_ARRAY;
    if (new Set(templateOrganisms).size < templateOrganisms.length) {
      throw new Error(
        `The template ${Template} specifies the same organism multiple times. Check the static 'organisms' property.`,
      );
    }

    const pageOrganisms = Component.organisms || EMPTY_ARRAY;
    if (new Set(pageOrganisms).size < pageOrganisms.length) {
      throw new Error(
        `The ${Component} page specifies the same organism multiple times. Check the static 'organisms' property.`,
      );
    }

    const organisms = new Set(templateOrganisms.concat(pageOrganisms));
    pageOrganismsCache.set(Component, organisms);
    return organisms;
  }
}

export default withRedux(storeFactory)(withReduxSaga(App));
