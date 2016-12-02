export const withToast = (action, toast) => ({
  ...action,
  meta: {
    ...(action.meta || {}),
    toast
  }
});
