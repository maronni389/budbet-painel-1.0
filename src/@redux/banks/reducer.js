import generateHandleActions from '../state-handler';
import {
  LIST_BANKS_ADMIN,
  CREATE_BANK_ADMIN,
  UPDATE_BANK,
} from '../constants';

const apiStates = [
  { type: LIST_BANKS_ADMIN, name: 'banksAdmin' },
  { type: CREATE_BANK_ADMIN, name: 'bank' },
  { type: UPDATE_BANK, name: 'bank' },
];

const instantStates = [];
const storage = {};
const listValues = [];

export default generateHandleActions({ apiStates, instantStates, storage, listValues });
