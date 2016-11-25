import { combineReducers } from 'redux';
import data, * as fromData from './data';
import { reducers } from './../modules';

export default () => combineReducers({
  ...reducers,
  data
});

export const getAllItems = (state, ...args) => fromData.getAllItems(state.data, ...args);
export const getItem = (state, ...args) => fromData.getItem(state.data, ...args);
export { selectors } from './../modules';

