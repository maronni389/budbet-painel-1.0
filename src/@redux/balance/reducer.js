import generateHandleActions from '../state-handler';
import {
  GET_BALANCE,
  LIST_BINGO_OPENED,
  LIST_BINGO_CLOSED,
} from '../constants';

const apiStates = [
  { type: GET_BALANCE, name: 'balance' },
  { type: LIST_BINGO_OPENED, name: 'bingoOpened' },
  { type: LIST_BINGO_CLOSED, name: 'bingoClosed' },
];

const instantStates = [];
const storage = {};
const listValues = [];

export default generateHandleActions({ apiStates, instantStates, storage, listValues });
