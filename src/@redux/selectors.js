import { createSelector } from 'reselect';
import { get } from 'lodash';
/**
 * Selectors are to be used in components when you need to get a @redux state.
 * Reducers are structured as follows for apiStates:
 *
 * { data: {}, error: {}, requesting: true|false, meta: {} }
 *
 * and a play object for instantStates:
 *
 * reducerName: AnyValue
 *
 * When you need to get only one key of an apiState, you may the correspondent selector.
 * For instance, if you want to get the data object
 * (where the result of an api operation is returned)
 * you can use the getDataSelector, getErrorSelector for error, etc.
 *
 * NOTE: It's recommended to use selectState for any api operations. selectState selector
 * fetches all the keys of an apiState reducer.
 */
export const selectors = (reducer, name) => {
  const reducerSelector = state => get(state, reducer);
  const propertySelector = createSelector(reducerSelector, state => get(state, name),
  );

  const dataSelector = createSelector(propertySelector, state => get(state, 'data'),
  );

  const requestingSelector = createSelector(propertySelector, state => get(state, 'requesting'),
  );

  const errorSelector = createSelector(propertySelector, state => get(state, 'error'),
  );

  return {
    propertySelector,
    dataSelector,
    requestingSelector,
    errorSelector,
  };
};

export const getSelector = (reducer, name) => {
  const reducerSelector = state => get(state, reducer);
  return createSelector(reducerSelector, state => get(state, name));
};

export const getDataSelector = (reducer, name) => {
  const propertySelector = getSelector(reducer, name);
  return createSelector(propertySelector, state => get(state, 'data'));
};

export const getRequestingSelector = (reducer, name) => {
  const propertySelector = getSelector(reducer, name);
  return createSelector(propertySelector, state => get(state, 'requesting'));
};

export const getErrorSelector = (reducer, name) => {
  const propertySelector = getSelector(reducer, name);
  return createSelector(propertySelector, state => get(state, 'error'));
};

export const getMetaSelector = (reducer, name) => {
  const propertySelector = getSelector(reducer, name);
  return createSelector(propertySelector, state => get(state, 'meta'));
};

export const selectState = (reducer, name) => (state, objectName = name) => ({
  [objectName]: getDataSelector(reducer, name)(state),
  [`${objectName}Requesting`]: getRequestingSelector(reducer, name)(state),
  [`${objectName}Error`]: getErrorSelector(reducer, name)(state),
  [`${objectName}Meta`]: getMetaSelector(reducer, name)(state),
});
