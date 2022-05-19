import generateHandleActions from '../state-handler';
import {
  CREATE_RULE,
  UPDATE_RULE,
  DELETE_RULE,
  LIST_RULE,
  READ_RULE_GAME,
} from '../constants';

const apiStates = [
  { type: CREATE_RULE, name: 'rule' },
  { type: UPDATE_RULE, name: 'rule' },
  { type: DELETE_RULE, name: 'rule' },
  { type: READ_RULE_GAME, name: 'rule' },
  { type: LIST_RULE, name: 'rules' },
];

const instantStates = [];
const storage = {};
const listValues = [];

export default generateHandleActions({ apiStates, instantStates, storage, listValues });
