import { v4 } from 'uuid';
import {
  FETCH_REQUEST,
  FETCH_RECEIVE,
  FETCH_FAILURE
} from './../constants/action-types';
import { normalizeResponse } from './../utils/normalizr';

export const fetchRequest = (dataType, ref) => ({
  type: FETCH_REQUEST,
  payload: {
    dataType,
    ref
  }
});

export const fetchReceive = (dataType, ref, response, normalize = true) => ({
  type: FETCH_RECEIVE,
  payload: {
    dataType,
    ref,
    data: normalize ? normalizeResponse(dataType, response) : response
  },
  meta: {
    containsNormalizedData: true
  }
});

export const fetchFailure = (dataType, ref, errorMessage) => ({
  type: FETCH_FAILURE,
  payload: {
    dataType,
    ref,
    errorMessage
  }
});

export const fetchAction = (dataType, ref, promise) => (dispatch, getState) => {
  // Check cache
  (async () => {
    dispatch(fetchRequest(dataType, ref));

    try {
      const response = await Promise.resolve(promise);

      dispatch(fetchReceive(dataType, ref, response));

    } catch (err) {
      console.log(err);
    }
  })();

};

export const fetchItems = (dataType, query = '') => (dispatch, getState) => {
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
};
