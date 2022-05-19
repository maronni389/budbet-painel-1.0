/* DO NOT EDIT DIRECTLY */
import { handleActions } from 'redux-actions';
import { get as lodashGet, isEmpty, set } from 'lodash';

import { apiTypes } from './redux-actions';

const storeMemory = (storage, name, data) => {
  if (storage[name] && !isEmpty(data)) {
    window.memoryDB[storage[name]] = JSON.stringify({ data });
  } else {
    window.memoryDB.removeItem(name);
  }
};

const loadMemory = (storage, name, defaultValue) => {
  if (storage[name]) {
    return (
      JSON.parse(window.memoryDB[storage[name]] || '{}').data || defaultValue
    );
  }
  return defaultValue;
};

const defaultObject = {
  requesting: false,
  meta: {},
  error: {},
  data: {},
};

const apiStateHandlers = (states, storage, listValues) => {
  let actionHandlers = {};
  let initialState = {};
  states.forEach((state) => {
    const {
      type,
      name,
      apiField,
      append,
      update,
      onSuccess,
      onFailure,
      clear,
    } = state;
    const types = apiTypes(type);
    const defaultValue = listValues.indexOf(name) === -1 ? {} : [];
    actionHandlers = {
      ...actionHandlers,
      // request
      [types[0]]: (state) => {
        const newState = { ...state };
        set(newState, `${name}.requesting`, true);
        set(newState, `${name}.meta`, {});
        set(newState, `${name}.error`, {});
        if (clear) {
          // return newState.setIn([name, 'data'], fromJS(defaultValue));
          return set(newState, `${name}.data`, defaultValue);
        }
        return newState;
      },
      // success
      [types[1]]: (state, action) => {
        const payload =
          (apiField ? lodashGet(action.payload, apiField) : action.payload) ||
          defaultValue;
        const { meta } = action.payload;
        storeMemory(
          storage,
          name,
          apiField ? lodashGet(action.payload, apiField) : action.payload,
        );
        if (action.onSuccess) setTimeout(() => action.onSuccess(payload), 0);
        const newState = onSuccess ? onSuccess(state, action) : state;
        set(newState, `${name}.requesting`, false);
        set(newState, `${name}.data`, payload);
        set(
          newState,
          `${name}.meta`,
          meta || {
            total: action.payload && action.payload && action.payload.size,
          },
        );
        // used when creation is done
        if (append) {
          return set(
            newState,
            `${append}.data`,
            lodashGet(newState, `${append}.data`, []).unshift(payload),
          );
        }
        // used when update is done
        if (update) {
          return set(
            newState,
            `${update}.data`,
            lodashGet(newState, `${update}.data`).map((item) => (lodashGet(item, 'id') === lodashGet(payload, 'id')
              ? payload
              : item),
            ),
          );
        }
        return newState;
      },
      // failure
      [types[2]]: (state, action) => {
        if (action.onFailure) setTimeout(() => action.onFailure(action.payload.error), 0);
        const newState = onFailure ? onFailure(state, action) : state;
        set(newState, `${name}.requesting`, false);
        set(newState, `${name}.error`, action.payload);
        set(newState, `${name}.meta`, {});
        return newState;
      },
      // clear
      [types[3]]: (state) => {
        storeMemory(storage, name, {});
        return {
          ...state,
          [name]: {
            requesting: false,
            meta: {},
            data: defaultValue,
            error: {},
          },
        };
      },
    };
    initialState = {
      ...initialState,
      [name]: {
        ...defaultObject,
        data: loadMemory(storage, name, defaultValue),
      },
    };
  });
  return { actionHandlers, initialState };
};

const instantStateHandlers = (states, storage, listValues) => {
  const actionHandlers = {};
  const initialState = {};
  states.forEach((state) => {
    const { type, name, kind } = state;
    const defaultData = listValues.indexOf(name) === -1 ? {} : [];
    const types = apiTypes(type);
    const defaultValue =
      kind === 'object'
        ? state.defaultValue || defaultData
        : state.defaultValue;
    // set
    actionHandlers[type] = (state, action) => {
      const value = action.payload || defaultValue;
      storeMemory(storage, name, value);
      return set(state, name, value);
    };
    // clear
    actionHandlers[types[3]] = (state) => {
      storeMemory(storage, name, defaultValue);
      // if (kind === 'object') {
      //   return state.set(name, fromJS(defaultValue));
      // }
      // return state.set(name, defaultValue);
      return set(state, name, defaultValue);
    };
    const memoryValue = loadMemory(storage, name, defaultValue);
    initialState[name] = memoryValue;
  });
  return { actionHandlers, initialState };
};

const generateHandleActions = ({
  apiStates,
  instantStates = [],
  storage = {},
  listValues = [],
}) => {
  const apiHandlers = apiStateHandlers(apiStates, storage, listValues);
  const instantHandlers = instantStateHandlers(
    instantStates,
    storage,
    listValues,
  );
  return handleActions(
    {
      ...apiHandlers.actionHandlers,
      ...instantHandlers.actionHandlers,
    },
    {
      ...apiHandlers.initialState,
      ...instantHandlers.initialState,
    },
  );
};

export default generateHandleActions;
