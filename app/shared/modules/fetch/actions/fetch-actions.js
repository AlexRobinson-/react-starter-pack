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

export const fA = universalPromise(
  (req, res) =>
    (dataType, ref, promise) => async (dispatch, getState) => {
      dispatch(fetchRequest(dataType, ref));

      try {
        const response = await
          Promise.resolve(promise);

        dispatch(fetchReceive(dataType, ref, response));
        res();

      } catch (err) {
        console.log(err);
        rej(err);
      }
    },
  {
    type: 'FETCH_FAILURE'
  }
);

const f = (dataType, ref) => universalPromise(
  (res, rej) => {

  },
  () => ({
    type: 'FETCH_FAILURE'
  })
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
