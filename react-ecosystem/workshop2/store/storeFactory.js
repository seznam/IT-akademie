import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '~/store/reducer';
import {initStore, start} from '~/store/sagas';

export default function storeFactory(initialState, {isServer, req, query}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState || {},
    applyMiddleware(sagaMiddleware),
  );

  store.runSagaTask = () => {
    if (isServer) {
      store.sagaTask = sagaMiddleware.run(initStore, req, query);
    } else {
      store.sagaTask = sagaMiddleware.run(start);
    }
  };

  store.runSagaTask();
  return store;
}
