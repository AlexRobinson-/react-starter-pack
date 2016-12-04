export const withData = (add, remove, replace) => action => ({
  ...action,
  meta: {
    ...(action.meta || {}),
    dataModule: {
      add,
      remove,
      replace
    }
  }
});
