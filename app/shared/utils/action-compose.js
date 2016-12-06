export default (action, ...args) => [].concat.apply([], args)
  .reduce(
    (prev, next) => typeof next === 'function' ? next(prev) : prev,
    action
  );
