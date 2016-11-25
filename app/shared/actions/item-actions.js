import { ADD_DATA, REMOVE_DATA } from './../constants/action-types';
import { normalizeResponse } from './../utils/normalizr';

export const addData = (dataType, ref, data, normalize = true) => ({
  type: ADD_DATA,
  payload: {
    dataType,
    ref,
    data: normalize ? normalizeResponse(dataType, data) : data
  }
});

export const removeData = (dataType, ref, ids) => ({
  type: REMOVE_DATA,
  payload: {
    dataType,
    ref,
    ids: ids
  }
});
