import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import generateReducer from './reducers';
import { middleware } from './modules';

export default () => {
  return createStore(
    generateReducer(),
    applyMiddleware(thunk, ...middleware, createLogger())
  )
}
