import { ByIdState } from './../../../utils/flow-types';

const addData = (state: ByIdState, data) => {
  if (!data) {
    return state;
  }

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

const removeData = (state: ByIdState, remove) => {
  if (!remove) {
    return state;
  }

  const newState = {
    ...state,
  };

  const ids = Array.isArray(remove) ? remove : [remove];

  ids.forEach(item => {

    const { id, dataType } = item;

    if (!newState[dataType]) {
      return;
    }
    delete newState[dataType][id];
  });

  return newState;
};

const byId = (state = {}, action) => {
  const { meta } = action;

  if (!meta || !meta.dataModule) {
    return state;
  }

  return removeData(
    addData(
      state, meta.dataModule.add
    ), meta.dataModule.remove
  );
};

export default byId;

export const getItem = (state, dataType, id) => state[dataType] && state[dataType][id];
