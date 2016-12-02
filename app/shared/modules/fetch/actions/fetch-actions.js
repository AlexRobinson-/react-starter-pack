import { v4 } from 'uuid';
import {
  FETCH_REQUEST,
  FETCH_RECEIVE,
  FETCH_CREATE_REQUEST,
  FETCH_CREATE_RECEIVE
} from './../constants/action-types';
import { normalizeResponse } from './../../../utils/normalizr';
import { withData } from './../../data/utils/action-creators';
import universalPromise from './../middlewares/universal-promise-middleware';

/*****
 * Helpers
 */


const actionMiddleware = (state, action, next) => {
  if (!next) {
    return action;
  }
  return next(action, state);
};


/*****
 * Get items
 */

export const fetchRequest = (dataType, ref) => ({
  type: FETCH_REQUEST,
  payload: {
    dataType,
    ref
  }
});

export const fetchReceive = (dataType, ref, response) => withData(
  {
    type: FETCH_RECEIVE,
    payload: {
      dataType,
      ref
    }
  },
  normalizeResponse(dataType, response)
);

export const fetchAction = (dataType, ref, promise) => (dispatch, getState) => universalPromise(
  (res, rej) => {
    dispatch(fetchRequest(dataType, ref));

    try {
      Promise
        .resolve(promise)
        .then(response => {
          dispatch(fetchReceive(dataType, ref, response));
          res();
        });
    } catch (err) {
      console.log(err);
      rej(err);
    }
  },
  () => ({
    type: 'FETCH_FAILURE'
  })
);


/**
 * Create items
 */

export const fetchCreateRequest = (dataType, data, tempId) => withData({
    type: FETCH_CREATE_REQUEST,
    payload: {
      dataType,
      tempId
    }
  },
  normalizeResponse(dataType, data)
);

export const fetchCreateReceive = (dataType, response, tempId) => withData({
    type: FETCH_CREATE_RECEIVE,
    payload: {
      dataType
    },
    meta: {
      toast: 'Created item'
    }
  },
  normalizeResponse(dataType, response),
  {
    dataType,
    id: tempId
  }
);

export const fetchCreateAction = (dataType, data, promise, optimistic = true) => async(dispatch, getState) => {
  const tempId = optimistic ? v4() : undefined;

  dispatch(fetchCreateRequest(dataType,
    {
      ...data,
      id: tempId
    },
    tempId
  ));

  try {
    const response = await promise;
    dispatch(fetchCreateReceive(dataType, response, tempId));
  } catch (err) {
    console.log(err);
  }
};


/**
 * Delete Item
 */

export const fetchDeleteRequest = (dataType, id) => ({
  type: 'FETCH_DELETE_REQUEST',
  payload: {
    dataType,
    id
  }
});

export const fetchDeleteReceive = (dataType, id) => withData({
    type: 'FETCH_DELETE_RECEIVE',
    payload: {
      dataType,
      id
    }
  },
  undefined,
  { dataType, id }
);

export const fetchDeleteAction = (dataType, id, promise, config = {}) => async(dispatch, getState) => {

  dispatch(fetchDeleteRequest(dataType, id));

  try {
    await promise;

    dispatch(
      actionMiddleware(
        { dispatch, getState },
        fetchDeleteReceive(dataType, id),
        config.onSuccess
      )
    );
  } catch (err) {
    console.log(err);
  }
};
