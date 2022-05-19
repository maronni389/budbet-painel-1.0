import invariant from 'invariant';
import { push } from 'connected-react-router';
import { message } from 'antd';

/**
 * requestStatusMiddleware takes an API Request action and handles updating the state
 * when requesting as well as dispatching actions for success and failure cases.
 */
export default function requestStatusMiddleware({ dispatch }) {
  return (next) => async (action) => {
    const {
      types,
      apiCall,
      payload = {},
      onSuccess,
      onFailure,
      /* notification, */
      args,
    } = action;
    // requestStatusMiddleware requires 3 action types, *_REQUEST, *_SUCCESS, *_FAILURE.
    // If the `types` key is absent, pass this action along to the next middleware.
    if (!types) {
      return next(action);
    }

    // The `types` key must be an array of 3 strings. If not, throw an error.
    invariant(
      Array.isArray(types) &&
        types.length === 3 &&
        types.every((type) => typeof type === 'string'),
      'requestStatusMiddleware expected `types` to be an array of 3 strings',
    );

    // The `apiCall` key must be a function.
    invariant(
      typeof apiCall === 'function',
      'requestStatusMiddleware expected `apiCall` to be a function',
    );
    /* const showError = !(notification && notification.noError); */
    const [requestType, successType, failureType] = types;

    dispatch({ type: requestType, payload });
    const data = await apiCall(...args);
    const { response, error } = data || { error: 'empty' };
    let notify = {};
    if (error && (error.status === 440 || error.status === 403)) {
      notify.message = 'Sessão expirada!';
      notify.type = 'error';
      dispatch(push('/'));
    } else if (error) {
      message.error(error.message);
      notify = error;
      notify.type = 'error';
      dispatch({
        data: {},
        type: failureType,
        error: true,
        payload: { error },
        request: payload,
        onFailure,
      });
    } else if (response) {
      if (response.body) {
        dispatch({
          type: successType,
          payload: response.body.data,
          request: payload,
          onSuccess,
        });
      } else {
        dispatch({
          type: successType,
          payload: '{}',
          request: payload,
          onSuccess,
        });
      }
    }
    return true;
  };
}
