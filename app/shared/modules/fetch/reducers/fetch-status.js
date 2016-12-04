import {
  FETCH_REQUEST,
  FETCH_RECEIVE,
  FETCH_CREATE_REQUEST,
  FETCH_CREATE_RECEIVE,
  FETCH_DELETE_REQUEST,
  FETCH_DELETE_RECEIVE
} from './../constants/action-types';
import {
  ERROR, LOADED, NOT_LOADED, PENDING
} from './../constants/fetch-status';


const cache = (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        [payload.dataType]: {
          ...(state[payload.dataType] || {}),
          [payload.ref]: PENDING
        }
      };
    case FETCH_RECEIVE:
      return {
        ...state,
        [payload.dataType]: {
          ...(state[payload.dataType] || {}),
          [payload.ref]: LOADED
        }
      };
    case FETCH_CREATE_REQUEST:
      return {
        ...state,
        [payload.dataType]: {
          ...(state[payload.dataType] || {}),
          [payload.tempId]: PENDING
        }
      };
    case FETCH_CREATE_RECEIVE:
      return {
        ...state,
        [payload.dataType]: {
          ...(state[payload.dataType] || {}),
          [payload.tempId]: LOADED
        }
      };
    case FETCH_DELETE_REQUEST:
      return {
        ...state,
        [payload.dataType]: {
          ...(state[payload.dataType] || {}),
          [payload.id]: PENDING
        }
      };
    case FETCH_DELETE_RECEIVE:
      return {
        ...state,
        [payload.dataType]: {
          ...(state[payload.dataType] || {}),
          [payload.id]: NOT_LOADED
        }
      };
    default:
      return state;
  }
};

export default cache;

export const getFetchStatus = (state, dataType, ref) => {
  if (!state[dataType] || !state[dataType][ref]) {
    return NOT_LOADED;
  }

  return state[dataType][ref];
};
