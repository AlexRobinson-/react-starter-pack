import { IdsState } from './../../utils/flow-types';

const addData = (state: IdsState, data) => {
  if (!data) {
    return state;
  }

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

const removeData = (state: IdsState, remove) => {
  if (!remove) {
    return state;
  }

  const newState = {
    ...state
  };

  const ids = Array.isArray(remove) ? remove : [remove];

  ids.forEach(({ dataType, id }) => {
    newState[dataType] = new Set(...(state[payload.dataType] || []));
    newState[dataType].delete(id);
  });

  return newState;
};

const ids = (state = {}, action) => {
  const { meta, } = action;

  if (!meta.dataModule) {
    return state;
  }

  return removeData(
    addData(
      state, meta.dataModule.add
    ), meta.dataModule.remove
  );
};

export default ids;

export const getIds = (state, dataType) => (state[dataType] ? Array.from(state[dataType]) : []);
