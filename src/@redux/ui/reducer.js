import generateHandleActions from '../state-handler';

import {
  SET_APP_TITLE,
  CLEAR_APP_TITLE,
} from '../constants';

const apiStates = [];

const instantStates = [
  { type: SET_APP_TITLE, name: 'appTitle' },
  { type: CLEAR_APP_TITLE, name: 'appTitle' },
];

const storage = {};

const listValues = [];

export default generateHandleActions({ apiStates, instantStates, storage, listValues });
