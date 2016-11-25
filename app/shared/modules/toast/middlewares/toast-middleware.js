import { v4 } from 'uuid';
import { clearToast } from './../actions/toast-actions';

const defaultTimeout = 2000;

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


    // Hijack action meta with toast + id
    if (typeof action.meta.toast === 'string') {
      return next({
        ...action,
        meta: {
          ...action.meta,
          toast: {
            id,
            message: action.meta.toast
          }
        }
      });
    }

    return next({
      ...action,
      meta: {
        ...action.meta,
        toast: {
          ...action.meta.toast,
          id,
        }
      }
    })
  }

  return next(action);
}
