import generateHandleActions from '../state-handler';
import {
  LIST_GLOBAL,
  READ_GLOBAL,
  UPDATE_GLOBAL,
  DELETE_GLOBAL,
} from '../constants';

const apiStates = [
  { type: LIST_GLOBAL, name: 'globalList' },
  { type: READ_GLOBAL, name: 'global' },
  { type: UPDATE_GLOBAL, name: 'global' },
  { type: DELETE_GLOBAL, name: 'global' },
];

const instantStates = [];
const storage = {};
const listValues = [];

export default generateHandleActions({ apiStates, instantStates, storage, listValues });
