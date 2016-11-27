const middleware = () => {

  let promises = [];

    const m = () => next => action => {

    const { __universal } = action;

    if (!__universal) {
      return next(action);
    }

    const { cancelAction } = __universal;

    const config = {
      promise: action,
      cancelAction
    };

    promises.push(config);

    action.then(() => {
      this.promises = this.promises.filter(x => x !== config)
    });
  };

  return {
    awaitPromises: () => Promise.all(promises.map(x => x.promise)),
    cancelPromises: () => {
      promises.forEach(config => {
        config.cancelAction()
      });
    },
    middleware: m
  };
};


const universalPromise = (callback, cancelAction) => {
  const p = new Promise(callback);
  p.__universal = {
    cancelAction
  };
  return p;
};
