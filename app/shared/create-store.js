import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';

export default () => {
  return createStore(
    reducer,
    applyMiddleware(thunk, createLogger())
  )
}
