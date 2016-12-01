import { combineReducers } from 'redux';
import data, * as fromData from './data';
import { reducer as toast } from './../modules/toast';

export default () => combineReducers({
  ...reducers,
  data
});

export const getAllItems = (state, ...args) => fromData.getAllItems(state.data, ...args);
export const getItem = (state, ...args) => fromData.getItem(state.data, ...args);
export { selectors } from './../modules';

