import generateHandleActions from '../state-handler';
import {
  LIST_BINGOBETS,
  CREATE_RANKING,
  CREATE_BINGOBETS,
} from '../constants';

const apiStates = [
  { type: LIST_BINGOBETS, name: 'bets' },
  { type: CREATE_RANKING, name: 'bets' },
  { type: CREATE_BINGOBETS, name: 'bets' },
];

const instantStates = [];
const storage = {};
const listValues = [];

export default generateHandleActions({ apiStates, instantStates, storage, listValues });
