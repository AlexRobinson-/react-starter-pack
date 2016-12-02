export const withData = (action, add, remove) => ({
  ...action,
  meta: {
    ...(action.meta || {}),
    dataModule: {
      add,
      remove
    }
  }
});
