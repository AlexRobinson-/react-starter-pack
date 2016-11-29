import { ADD_DATA, REMOVE_DATA } from './../constants/action-types';
import { normalizeResponse } from './../utils/normalizr';
import { Action } from './../utils/flow-types';

export const addData: Action = (dataType, data, normalize = true) => ({
  type: ADD_DATA,
  payload: {
    dataType,
    data: normalize ? normalizeResponse(dataType, data) : data
  },
  meta: {
    toast: 'Added item',
    containsNormalizedData: true
  }
});

export const removeData = (dataType, ids) => ({
  type: REMOVE_DATA,
  payload: {
    dataType,
    ids: Array.isArray(ids) ? ids : [ids]
  }
});
