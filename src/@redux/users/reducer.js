import generateHandleActions from '../state-handler';
import {
  CREATE_USER,
  READ_USER,
  UPDATE_USER,
  LIST_USERS,
  CLEAR_USER,
  DELETE_USER,
  SEND_CONFIRM_USER,
  CONFIRM_USER_EMAIL,
} from '../constants';

const apiStates = [
  { type: LIST_USERS, name: 'users' },
  { type: CREATE_USER, name: 'user' },
  { type: READ_USER, name: 'user' },
  { type: DELETE_USER, name: 'user' },
  { type: UPDATE_USER, name: 'user' },
  { type: CLEAR_USER, name: 'user' },
  { type: SEND_CONFIRM_USER, name: 'user' },
  { type: CONFIRM_USER_EMAIL, name: 'user' },
];

const instantStates = [];
const storage = {};
const listValues = [];

export default generateHandleActions({ apiStates, instantStates, storage, listValues });
