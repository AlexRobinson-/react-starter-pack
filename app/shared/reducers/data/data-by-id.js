import {
  ADD_DATA,
  REMOVE_DATA
} from './../../constants/action-types';

const byId = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_DATA:
      return Object.keys(payload.data.entities).reduce(
        (newState, dataType) => ({
          ...state,
          [dataType]: {
            ...(newState[dataType] || []),
            ...payload.data.entities[dataType]
          }
        }), state
      );
    case REMOVE_DATA:
      const ids = Array.isArray(payload.ids) ? payload.ids : [payload.ids];
      const newState = { ...state };
      ids.forEach(id => delete newState[id]);
      return newState;
    default:
      return state;
  }
};

export default byId;

export const getItem = (state, dataType, id) => state[dataType] && state[dataType][id];
