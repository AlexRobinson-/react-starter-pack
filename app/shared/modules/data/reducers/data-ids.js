import { IdsState } from './../../../utils/flow-types';

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

  ids.forEach(({ id, dataType }) => {
    newState[dataType] = new Set(newState[dataType] || []);
    newState[dataType].delete(id);
  });

  return newState;
};

const replaceData = (state: IdsState, replace) => {
  if (!replace) {
    return state;
  }

  const newState = {
    ...state
  };

  Object.keys(replace).forEach(dataType => {
    const replaceConfig = Array.isArray(replace[dataType]) ? replace[dataType] : [replace[dataType]];
    const newDataTypeState = Array.from(newState[dataType] || []);

    replaceConfig.forEach(config => {
      const index = newDataTypeState.indexOf(config.replaceId);
      if (index > -1) {
        newDataTypeState[index] = config.newId;
      } else {
        newDataTypeState.push(config.newId);
      }
    });

    newState[dataType] = new Set(newDataTypeState);
  });

  return newState;
};

const ids = (state = {}, action) => {
  const { meta, } = action;

  if (!meta || !meta.dataModule) {
    return state;
  }

  return replaceData(
    removeData(
      addData(
        state, meta.dataModule.add
      ),
      meta.dataModule.remove
    ),
    meta.dataModule.replace
  );

};

export default ids;

export const getIds = (state, dataType) => (state[dataType] ? Array.from(state[dataType]) : []);
