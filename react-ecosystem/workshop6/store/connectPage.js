import withReduxSaga from 'next-redux-saga';
import withRedux from 'next-redux-wrapper';
import React from 'react';
import storeFactory from '~/store/storeFactory';

const IDENTITY_SELECTOR = state => state;
const EMPTY_ARRAY = [];

export default function connectPage(PageComponent, stateToProps = IDENTITY_SELECTOR) {
  const pageComponentName = PageComponent.displayName || PageComponent.name || 'PageComponent';
  const Template = PageComponent.template;

  class PageConnector extends React.PureComponent {
    static getInitialProps(context) {
      const templateOrganisms = Template && Template.organisms || EMPTY_ARRAY;
      if (new Set(templateOrganisms).size < templateOrganisms.length) {
        throw new Error(
          `The template ${Template} specifies the same organism multiple times. Check the static 'organisms' ` +
          'property',
        );
      }

      const pageOrganisms = PageComponent.organisms || EMPTY_ARRAY;
      if (new Set(pageOrganisms).size < pageOrganisms.length) {
        throw new Error(
          `The ${PageComponent} page specifies the same organism multiple times. Check the static 'organisms' ` +
          'property',
        );
      }

      for (const organism of new Set(templateOrganisms.concat(pageOrganisms)).values()) {
        if (organism.init) {
          organism.init(context.store.dispatch, context.query, !!context.req);
        }
      }

      if (PageComponent.getInitialProps) {
        return PageComponent.getInitialProps(context);
      }
    }

    static displayName = `PageConnector(${pageComponentName})`;

    render() {
      if (Template) {
        return (
          <Template>
            <PageComponent {...this.props}/>
          </Template>
        );
      }

      return <PageComponent {...this.props}/>;
    }
  }

  return withRedux(storeFactory, stateToProps)(withReduxSaga(PageConnector));
}
