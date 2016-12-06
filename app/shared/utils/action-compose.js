export default (action, ...args) => [].concat.apply([], args)
  .reduce(
    (prev, next) => {
      if (typeof next !== 'function') {
        console.warn('Something other than a function was passed to action-compose. Ignoring', next);
        return prev;
      }
      return next(prev);
    }, action
  );
