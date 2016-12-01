import { combineReducers } from 'redux';
import byId, * as fromById from './data-by-id';
import ids, * as fromIds from './data-ids';

export default combineReducers({
  byId,
  ids
});

export const selectors = {
  getItem: (state, dataType, id) => fromById.getItem(state.byId, dataType, id),
  getAllItems: (state, dataType) => fromIds.getIds(state.ids, dataType).map(id => getItem(state, dataType, id))
};

