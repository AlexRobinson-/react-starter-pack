import { combineReducers } from 'redux';
import { registerModule, reducers } from './../modules';
import data, * as fromData from './data';
import toast from './../modules/toast';

registerModule('toast', toast);

console.log('reducers', reducers);

const reducer = combineReducers({
  ...reducers,
  data
});

export default reducer;

export const getAllItems = (state, ...args) => fromData.getAllItems(state.data, ...args);
export const getItem = (state, ...args) => fromData.getItem(state.data, ...args);
export { selectors } from './../modules';

