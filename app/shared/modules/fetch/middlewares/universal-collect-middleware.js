import { v4 } from 'uuid';

const results = {
  123: {
    promise: new Promise(res => res([{ id: 123, title: 'do stuff' }]))
  }
};

export const collectMiddleware = () => next => action => {
  if (action && action.meta && action.meta.collect) {
    const key = v4();

    const newAction = {
      ...action,
      meta: {
        ...action.meta,
        collect: {
          key
        }
      }
    };

    results[key] = {
      promise: action.meta.collect.promise
    };

    return next(newAction);
  }

  return next(action);
};

export const collectPromise = (action, callback) => ({
  ...action,
  meta: {
    ...(action.meta || {}),
    collect: {
      promise: new Promise(callback)
    }
  }
});

export const collectData = () => (dispatch, getState) => {

  const keys = getState().fetch.collect;

  keys.forEach(key => {
    fetch(`/api/collect/${key}`)
      .then(res => res.json())
      .then(res => dispatch(res));
  })

};

export const collectApi = (req, res) => {

  const config = results[req.params.key];

  if (!config || !config.promise) {
    res.sendStatus(400);
  }

  Promise
    .resolve(config.promise)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.sendStatus(500);
    });
};


