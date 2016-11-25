import { v4 } from 'uuid';
import {
  FETCH_REQUEST,
  FETCH_RECEIVE,
  FETCH_FAILURE
} from './../constants/action-types';
import { TODO_TYPE } from './../constants/data-types';
import { normalizeResponse } from './../utils/normalizr';
import {
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCESS
} from './../constants/fetch-status-types';

const data = {
  [TODO_TYPE]: {}
};

const _createTodo = title => {
  const id = v4();
  data[TODO_TYPE][id] = {
    title,
    id
  }
};

_createTodo('Do stuff');
_createTodo('Do more stuff');

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
    response
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

export const fetchAction = (dataType, ref, promise) => async (dispatch, getState) => {
  // Check cache

  dispatch(fetchRequest(dataType, ref));

  try {
    const response = await promise();

    dispatch(fetchReceive(dataType, ref, response));

  } catch (err) {
    dispatch(fetch)
  }
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
