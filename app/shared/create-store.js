import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import generateReducer from './reducers';
import { middleware } from './modules';

export default (initialState, universalPromise) => {
  const middlewares = [
    thunk,
    ...middleware
  ];

  if (typeof process !== 'undefined' && !process.env) {
    middlewares.push(createLogger());
  }

  if (universalPromise) {
    middlewares.unshift(universalPromise);
  }

  return createStore(
    generateReducer(),
    initialState,
    applyMiddleware(...middlewares)
  )
}
