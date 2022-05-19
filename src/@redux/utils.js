export const dispatchMaker = methods => (dispatch) => {
  const methodsGroup = {};
  methods.forEach((method) => {
    methodsGroup[method[1]] = (...args) => dispatch(method[0](...args));
  });
  return methodsGroup;
};
