import { v4 } from 'uuid';
import { clearToast } from './../actions/toast-actions';

const defaultTimeout = 2000;

const createToast = (toast, timeout = defaultTimeout, dispatch) => {
  const id = v4();

  setTimeout(() => {
    dispatch(clearToast(id));
  }, timeout);

  if (typeof toast === 'string') {
    return {
      message: toast,
      id
    };
  }

  return {
    ...toast,
    id
  };

};

export default ({ dispatch }) => next => action => {

  if (action.meta && action.meta.toast) {
    const id = v4();

    const simpleToast = typeof action.meta.toast === 'string';
    const timeout = simpleToast || !action.meta.toast.timeout
      ? defaultTimeout
      : action.meta.toast.timeout;

    // Create clear action
    setTimeout(() => {
      dispatch(clearToast(id));
    }, timeout);

    const toasts = Array.isArray(action.meta.toast) ? action.meta.toast : [action.meta.toast];


    return next({
      ...action,
      meta: {
        ...action.meta,
        toast: toasts.map(toast => createToast(toast, timeout, dispatch))
      }
    });
  }

  return next(action);
}
