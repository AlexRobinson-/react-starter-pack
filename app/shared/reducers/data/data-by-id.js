import {
  REMOVE_DATA
} from './../../constants/action-types';

const withData = (state, payload, meta) => {
  if (!meta || !meta.containsNormalizedData || !payload.data) {
    return state;
  }

  const { data } = payload;

  return Object.keys(data.entities).reduce(
    (newState, dataType) => ({
      ...state,
      [dataType]: {
        ...(newState[dataType] || []),
        ...data.entities[dataType]
      }
    }), state
  );
};

const byId = (oldState = {}, action) => {
  const { type, meta, payload } = action;

  const state = withData(oldState, payload, meta);

  switch (type) {
    case REMOVE_DATA:
      const ids = Array.isArray(payload.ids) ? payload.ids : [payload.ids];
      ids.forEach(id => delete state[id]);
      return state;
    default:
      return state;
  }
};

export default byId;

export const getItem = (state, dataType, id) => state[dataType] && state[dataType][id];
