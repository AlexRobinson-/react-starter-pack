import reducer, { selectors } from './reducers';
import toastMiddleware from './middlewares/toast-middleware';

export default {
  reducer,
  selectors,
  middleware: [
    toastMiddleware
  ]
};
