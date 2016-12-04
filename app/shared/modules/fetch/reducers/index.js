import { combineReducers } from 'redux';
import status, * as fromStatus from './fetch-status';

export default combineReducers({
  status
});

export const getFetchStatus = (state, ...args) => fromStatus.getFetchStatus(state.status, ...args);
