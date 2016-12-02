export const withData = (add, remove) => action => ({
  ...action,
  meta: {
    ...(action.meta || {}),
    dataModule: {
      add,
      remove
    }
  }
});
