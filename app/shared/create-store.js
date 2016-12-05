import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import generateReducer from './reducers';
import { middleware } from './modules';

export default (initialState, additionalMiddleware) => {
  const middlewares = [
    thunk,
    ...middleware
  ];

  if (typeof process !== 'undefined' && !process.env) {
    middlewares.push(createLogger());
  }

  if (additionalMiddleware) {
    if (Array.isArray(additionalMiddleware)) {
      middlewares.unshift(...additionalMiddleware);
    } else {
      middlewares.unshift(additionalMiddleware);
    }
  }

  return createStore(
    generateReducer(),
    initialState,
    typeof process !== 'undefined' && !process.env
      ? applyMiddleware(...middlewares)
      : applyMiddleware(...middlewares, createLogger())
  )
}
