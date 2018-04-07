import withReduxSaga from 'next-redux-saga';
import withRedux from 'next-redux-wrapper';
import storeFactory from '~/store/storeFactory';

const IDENTITY_SELECTOR = state => state;

export default function connectPage(pageComponent, stateToProps = IDENTITY_SELECTOR) {
  return withRedux(storeFactory, stateToProps)(withReduxSaga(pageComponent));
}
