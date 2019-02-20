import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '~/store/reducer';
import rootSaga from '~/store/sagas';

export default function storeFactory(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState || {},
    applyMiddleware(sagaMiddleware),
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}
