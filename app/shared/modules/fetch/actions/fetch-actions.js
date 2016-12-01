import { v4 } from 'uuid';
import {
  FETCH_REQUEST,
  FETCH_RECEIVE,
  FETCH_FAILURE
} from './../../../constants/action-types';
import { normalizeResponse } from './../../../utils/normalizr';
import universalPromise from './../middlewares/universal-promise-middleware';

export const fetchRequest = (dataType, ref) => ({
  type: FETCH_REQUEST,
  payload: {
    dataType,
    ref
  }
});

export const fetchReceive = (dataType, ref, response) => ({
  type: FETCH_RECEIVE,
  payload: {
    dataType,
    ref,
    data: normalizeResponse(dataType, response)
  },
  meta: {
    containsNormalizedData: true
  }
});

export const fetchCreateRequest = (dataType, id, data, normalize = true) => {
  const action = fetchRequest(dataType, id);
  return {
    ...action,
    payload: {
      ...action.payload,
      tempId: id,
      data: normalize ? normalizeResponse(dataType, data || []) : data
    }
  }
};

export const fetchFailure = (dataType, ref, errorMessage) => ({
  type: FETCH_FAILURE,
  payload: {
    dataType,
    ref,
    errorMessage
  }
});

export const fetchCreate = (dataType, ref, promise, normalize = true) => (dispatch) => {
  const tempId = v4();

  dispatch(fetchCreateRequest(dataType, ref));

};

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

export const fetchItems = (dataType, query = '') => universalPromise(
  (req, res) => (dispatch, getState) => {

    // Check cache
    dispatch({
      type: FETCH_GET_ITEMS,
      payload: {
        status: FETCH_REQUEST,
        query
      }
    });

    // Fetch data
    const response = Object.keys(data[dataType]).map(id => data[dataType][id]); // ignore query for now

    // dispatch
    dispatch({
      type: FETCH_GET_ITEMS,
      payload: {
        status: FETCH_SUCCESS,
        response: normalizeResponse(response)
      }
    });
  }
);
