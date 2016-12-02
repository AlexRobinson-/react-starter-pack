export default (state, action, ...args) => [].concat.apply([], args)
  .reduce(
    (prev, next) => typeof next === 'function' ? next(prev, state) : prev,
    action
  );
