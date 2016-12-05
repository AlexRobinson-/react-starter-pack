import { combineReducers } from 'redux';
import status, * as fromStatus from './fetch-status';
import collect from './fetch-collect';

export default combineReducers({
  status,
  collect
});

export const getFetchStatus = (state, ...args) => fromStatus.getFetchStatus(state.status, ...args);
