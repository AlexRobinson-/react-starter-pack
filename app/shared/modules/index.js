const reducers = {};
const selectors = {};

export const registerModule = (name, module) => {
  // Register reducer
  reducers[name] = module.reducer;

  // Expose selectors
  selectors[name] = Object
    .keys(module.selectors)
    .reduce(
      (mod, funcName) => ({
        ...mod,
        [funcName]: (state, ...args) => {
          console.log('calling selector', name, funcName, state);
          return module.selectors[funcName](state[name], ...args)
        }
      }), {}
    );
  console.log('selectors', selectors);
};

export {
  reducers,
  selectors
}
