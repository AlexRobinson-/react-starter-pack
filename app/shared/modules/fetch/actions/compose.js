export const withCollect = callback => action => ({
  ...action,
  meta: {
    ...(action.meta || {}),
    collect: {
      promise: new Promise(callback)
    }
  }
});

export const withUniversalPromise = (callback, cancelAction) => action => ({
  ...action,
  meta: {
    ...(action.meta || {}),
    universalPromise: {
      promise: new Promise(callback),
      cancelAction
    }
  }
});
