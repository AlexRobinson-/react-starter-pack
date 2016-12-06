const UNIVERSAL_PROMISE = 'UNIVERSAL_PROMISE';

class UniversalPromiseCollector {

  constructor() {
    this.promises = [];
  }

  middleware() {
    return ({ dispatch, getState }) => next => action => {

      const result = next(action);

      if (!action || !action.meta || !action.meta.universalPromise) {
        return result;
      }

      const { cancelAction, promise } = action.meta.universalPromise;

      const config = {
        promise,
        cancelAction
      };

      this.promises.push(config);

      config.promise.then(() => {
        this.promises = this.promises.filter(x => x !== config)
      });

      return result;
    }
  }

  cancelPromises() {
    this.promises.forEach(config => {
      config.cancelAction()
    });
  }

  awaitPromises() {
    return Promise.all(this.promises.map(x => x.promise));
  }
}

export {
  UniversalPromiseCollector
}
