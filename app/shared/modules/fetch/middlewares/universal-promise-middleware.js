const UNIVERSAL_PROMISE = 'UNIVERSAL_PROMISE';

class UniversalPromiseCollector {

  constructor () {
    this.promises = [];
  }

  middleware () {
    return ({ dispatch, getState }) => next => action => {

      const result = next(action);

      if (!result || !result.__universal) {
        return result;
      }

      const { cancelAction } = result.__universal;

      const config = {
        promise: result,
        cancelAction
      };

      this.promises.push(config);

      config.promise.then(() => {
        this.promises = this.promises.filter(x => x !== config)
      });
    }
  }

  cancelPromises () {
    this.promises.forEach(config => {
      config.cancelAction()
    });
  }

  awaitPromises () {
    return Promise.all(this.promises.map(x => x.promise));
  }
}

const universalPromise = (callback, cancelAction) => {
  const p = new Promise(callback);
  p.__universal = {
    cancelAction
  };
  return p;
};

export default universalPromise;

export {
  universalPromise,
  UniversalPromiseCollector
}
