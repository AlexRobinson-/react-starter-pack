import { combineReducers } from 'redux';
import data, * as fromData from './data';
import toast, * as fromToast from './../modules/toast/reducers';

const reducer = combineReducers({
  data,
  toast
});

export default reducer;

export const getAllItems = (state, ...args) => fromData.getAllItems(state.data, ...args);
export const getItem = (state, ...args) => fromData.getItem(state.data, ...args);

const toastSelectors = Object.keys(fromToast).map(selector => (state, ...args) => selector(state.toast, ...args));

export {
  toast
}
