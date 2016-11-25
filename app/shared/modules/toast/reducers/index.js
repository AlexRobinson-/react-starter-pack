import { CLEAR_TOAST } from './../constants/action-types';

const toasts = (state = [], action) => {
  const { type, payload, meta } = action;

  if (type === CLEAR_TOAST) {
    return state; //.filter(toast => toast.id !== payload.id);
  }

  if (!meta || !meta.toast) {
    return state;
  }

  if (Array.isArray(meta.toast)) {
    return [
      ...state,
      ...meta.toast
    ];
  }

  return [
    ...state,
    meta.toast
  ]
};

export default toasts;

export const selectors = {
  getToasts: state => {
    console.log('getting toasts', state);
    return [...state]
  }
};
