import { createApiAction } from '../redux-actions';
import restApis from '../restApis';
import {
  GET_BALANCE,
  LIST_BINGO_OPENED,
  LIST_BINGO_CLOSED,
} from '../constants';

const balance = restApis('balance/count');
const bingoOpened = restApis('bingo/open');
const bingoClosed = restApis('bingo/closed');

export const balanceAction = createApiAction(GET_BALANCE, balance.list);
export const listBingoClosedAction = createApiAction(LIST_BINGO_CLOSED, bingoClosed.list);
export const listBingoOpenedAction = createApiAction(LIST_BINGO_OPENED, bingoOpened.list);
