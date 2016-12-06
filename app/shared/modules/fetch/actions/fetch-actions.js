import { v4 } from 'uuid';
import {
  FETCH_REQUEST,
  FETCH_RECEIVE,
  FETCH_CREATE_REQUEST,
  FETCH_CREATE_RECEIVE,
  FETCH_DELETE_REQUEST,
  FETCH_DELETE_RECEIVE
} from './../constants/action-types';
import { normalizeResponse } from './../../../utils/normalizr';
import { withData } from './../../data/utils/action-creators';
import actionCompose from './../../../utils/action-compose';
import { selectors } from './../../../modules';
import { PENDING, LOADED } from './../constants/fetch-status';
import { withCollect, withUniversalPromise } from './compose';

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

export const fetchReceive = (dataType, ref, response) => actionCompose(
  undefined,
  {
    type: FETCH_RECEIVE,
    payload: {
      dataType,
      ref
    }
  },
  withData(
    normalizeResponse(dataType, response)
  )
);

export const fetchActionDeferred = (dataType, ref, promise) => (dispatch, getState) => {

  const status = selectors.fetch.getFetchStatus(getState(), dataType, ref);

  if (status === PENDING || status === LOADED) {
    return;
  }

  dispatch(
    actionCompose(
      { dispatch, getState },
      fetchRequest(dataType, ref),
      withCollect((res, rej) => {
          try {
            Promise
              .resolve(promise)
              .then(response => {
                dispatch(fetchReceive(dataType, ref, response));
                res(fetchReceive(dataType, ref, response));
              });
          } catch (err) {
            console.error(err);
            rej(err);
          }
        }
      )
    )
  );
};

export const fetchAction = (dataType, ref, promise) => (dispatch, getState) => {
  const status = selectors.fetch.getFetchStatus(getState(), dataType, ref);

  if (status === PENDING || status === LOADED) {
    return;
  }

  dispatch(
    actionCompose(
      { dispatch, getState },
      fetchRequest(dataType, ref),
      withUniversalPromise(
        (res, rej) => {
          try {
            Promise
              .resolve(promise)
              .then(response => {
                dispatch(fetchReceive(dataType, ref, response));
                res();
              });
          } catch (err) {
            console.error(err);
            rej(err);
          }
        },
        () => ({
          type: FETCH_FAILURE
        })
      )
    )
  );
};

export const fetchAction2 = (dataType, ref, promise) => (dispatch, getState) => universalPromise(
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
      console.error(err);
      rej(err);
    }
  },
  () => ({
    type: FETCH_FAILURE
  })
);


/**
 * Create items
 */

export const fetchCreateRequest = (dataType, data, tempId) => actionCompose(
  undefined,
  {
    type: FETCH_CREATE_REQUEST,
    payload: {
      dataType,
      tempId
    }
  },
  withData(normalizeResponse(dataType, data))
);

export const fetchCreateReceive = (dataType, response, tempId) => actionCompose(
  undefined,
  {
    type: FETCH_CREATE_RECEIVE,
    payload: {
      dataType,
      tempId
    },
  },
  withData(
    normalizeResponse(dataType, response),
    undefined,
    {
      [dataType]: {
        replaceId: tempId,
        newId: response.id
      }
    }
  )
);

export const fetchCreateAction = (dataType, data, promise, config = {}) => async(dispatch, getState) => {
  const tempId = config.optimistic !== false ? v4() : undefined;

  dispatch(fetchCreateRequest(dataType,
    {
      ...data,
      id: tempId
    },
    tempId
  ));

  try {
    const response = await promise;
    dispatch(
      actionCompose(
        { dispatch, getState },
        fetchCreateReceive(dataType, response, tempId),
        config.onSuccess
      )
    );
  } catch (err) {
    console.error(err);
  }
};


/**
 * Delete Item
 */

export const fetchDeleteRequest = (dataType, id) => ({
  type: FETCH_DELETE_REQUEST,
  payload: {
    dataType,
    id
  }
});

export const fetchDeleteReceive = (dataType, id) => actionCompose(
  undefined,
  {
    type: FETCH_DELETE_RECEIVE,
    payload: {
      dataType,
      id
    }
  },
  withData(
    undefined,
    { dataType, id }
  )
);

export const fetchDeleteAction = (dataType, id, promise, config = {}) => async(dispatch, getState) => {

  dispatch(fetchDeleteRequest(dataType, id));

  try {
    await promise;

    dispatch(
      actionCompose(
        { dispatch, getState },
        fetchDeleteReceive(dataType, id),
        config.onSuccess
      )
    );

  } catch (err) {
    console.error(err);
  }
};
