import {
  ADD_DATA,
  REMOVE_DATA
} from './../../constants/action-types';

const withData = (state, payload, meta) => {
  if (!meta || !meta.containsNormalizedData || !payload.data) {
    return state;
  }

  const { data } = payload;

  return Object.keys(data.result).reduce(
    (newState, dataType) => ({
      ...newState,
      [dataType]: new Set([
        ...(state[dataType] ? Array.from(state[dataType]) : []),
        ...data.result[dataType]
      ])
    }), state
  );
};

const ids = (oldState = {}, action) => {
  const { type, payload, meta, } = action;

  const state = withData(oldState, payload, meta);

  switch (type) {
    case REMOVE_DATA:
      const newSubState = new Set(...(state[payload.dataType] || []));
      payload.ids.forEach(id => newSubState.delete(id));

      return {
        ...state,
        [payload.dataType]: newSubState
      };
    default:
      return state;
  }
};

export default ids;

export const getIds = (state, dataType) => (state[dataType] ? Array.from(state[dataType]) : []);
