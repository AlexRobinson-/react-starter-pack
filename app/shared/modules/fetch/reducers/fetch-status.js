import { FETCH_REQUEST, FETCH_RECEIVE } from './../constants/action-types';


const cache = (state = {}, action) => {

  const { payload } = action;

  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        [payload.dataType]: {
          ...(state[payload.dataType] || {}),
          [payload.ref]: 'PENDING'
        }
      };
    case FETCH_RECEIVE:
      return {
        ...state,
        [payload.dataType]: {
          ...(state[payload.dataType] || {}),
          [payload.ref]: 'LOADED'
        }
      };
    default:
      return state;
  }
};

export default cache;
