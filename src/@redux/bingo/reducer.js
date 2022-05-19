import generateHandleActions from '../state-handler';
import {
  CREATE_BINGO,
  UPDATE_BINGO,
  DELETE_BINGO,
  LIST_BINGO,
} from '../constants';

const apiStates = [
  { type: LIST_BINGO, name: 'bingos' },
  { type: CREATE_BINGO, name: 'bingo' },
  { type: UPDATE_BINGO, name: 'bingo' },
  { type: DELETE_BINGO, name: 'bingo' },
];

// not used useSelector(selectState('bingo','bingo'));

const instantStates = [];
const storage = {};
const listValues = [];

export default generateHandleActions({ apiStates, instantStates, storage, listValues });
