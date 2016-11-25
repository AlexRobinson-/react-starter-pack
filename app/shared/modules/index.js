import toast from './toast';

const reducers = {};
const selectors = {};
const middleware = [];

export const registerModule = (name, module) => {
  // Register reducer
  reducers[name] = module.reducer;

  // register middleware
  if (module.middleware) {
    if (Array.isArray(module.middleware)) {
      middleware.push(...module.middleware);
    } else {
      middleware.push(module.middleware);
    }
  }

  // Expose selectors
  selectors[name] = Object
    .keys(module.selectors)
    .reduce(
      (mod, funcName) => ({
        ...mod,
        [funcName]: (state, ...args) => {
          return module.selectors[funcName](state[name], ...args)
        }
      }), {}
    );
};

export {
  reducers,
  selectors,
  middleware
}

registerModule('toast', toast);
