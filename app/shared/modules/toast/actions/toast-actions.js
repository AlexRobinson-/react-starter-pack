import { CLEAR_TOAST } from './../constants/action-types';

export const clearToast = id => ({
  type: CLEAR_TOAST,
  payload: {
    id
  }
});
