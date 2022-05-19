import { createAction, createClearAction } from '../redux-actions';

import {
  SET_APP_TITLE,
  CLEAR_APP_TITLE,
} from '../constants';

export const setAppTitle = createAction(SET_APP_TITLE);
export const clearAppTitle = createClearAction(CLEAR_APP_TITLE);
