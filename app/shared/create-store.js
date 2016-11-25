import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import toastMiddleware from './modules/toast/middlewares/toast-middleware';
import generateReducer from './reducers';

export default () => {
  return createStore(
    generateReducer(),
    applyMiddleware(thunk, toastMiddleware, createLogger())
  )
}
