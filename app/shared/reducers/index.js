import { combineReducers } from 'redux';
import { reducers } from './../modules';

export default () => combineReducers({
  ...reducers,
});
