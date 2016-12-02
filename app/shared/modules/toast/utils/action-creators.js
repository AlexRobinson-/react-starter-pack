export const withToast = newToast => action => {

  const existingToasts = action.meta && action.meta.toast || [];
  const toast = [
    ...(Array.isArray(existingToasts) ? existingToasts : [existingToasts]),
    newToast
  ];

  return {
    ...action,
    meta: {
      ...(action.meta || {}),
      toast
    }
  };
};
