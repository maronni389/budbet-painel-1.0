import generateHandleActions from '../state-handler';
import {
  UPDATE_TRANSACTION,
  LIST_TRANSACTION,
  CREATE_TRANSACTION,
} from '../constants';

const apiStates = [
  { type: UPDATE_TRANSACTION, name: 'transaction' },
  { type: CREATE_TRANSACTION, name: 'transaction' },
  { type: LIST_TRANSACTION, name: 'transactions' },
];

const instantStates = [];
const storage = {};
const listValues = [];

export default generateHandleActions({ apiStates, instantStates, storage, listValues });
