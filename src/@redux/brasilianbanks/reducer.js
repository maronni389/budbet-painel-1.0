import generateHandleActions from '../state-handler';
import {
  CREATE_BRAZILIANBANK,
  LIST_BRAZILIANBANK,
  UPDATE_BRAZILIANBANK,
  DELETE_BRAZILIANBANK,
} from '../constants';

const apiStates = [
  { type: CREATE_BRAZILIANBANK, name: 'bankList' },
  { type: LIST_BRAZILIANBANK, name: 'bankList' },
  { type: UPDATE_BRAZILIANBANK, name: 'bankList' },
  { type: DELETE_BRAZILIANBANK, name: 'bankList' },
];

const instantStates = [];
const storage = {};
const listValues = [];

export default generateHandleActions({ apiStates, instantStates, storage, listValues });
