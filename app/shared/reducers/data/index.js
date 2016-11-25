import { combineReducers } from 'redux';
import byId from './data-by-id';
import ids from './data-ids';

export default combineReducers({
  byId,
  ids
});
