const collect = (state = [], action) => {

  if (!action || !action.meta || !action.meta.collect) {
    return state;
  }

  return [
    ...state,
    action.meta.collect.key
  ];
};


export default collect;
