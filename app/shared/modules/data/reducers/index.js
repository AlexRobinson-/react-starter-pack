import { combineReducers } from 'redux';
import byId, * as fromById from './data-by-id';
import ids, * as fromIds from './data-ids';

export default combineReducers({
  byId,
  ids
});

/* Selectors */

export const getItem = (state, dataType, id) => fromById.getItem(state.byId, dataType, id);

export const getAllItems = (state, dataType) => fromIds.getIds(state.ids, dataType).map(id => getItem(state, dataType, id));

