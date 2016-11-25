import {
  ADD_DATA,
  REMOVE_DATA
} from './../../constants/action-types';


const ids = (state = {}, action) => {
  const { payload, type } = action;

  switch (type) {
    case ADD_DATA:
      return Object.keys(payload.data.result).reduce(
        (newState, dataType) => ({
          ...newState,
          [dataType]: new Set([
            ...(state[dataType] || []),
            ...payload.data.result[dataType]
          ])
        }), state
      );
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
