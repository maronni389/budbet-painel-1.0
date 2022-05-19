import { createApiAction } from '../redux-actions';
import restApis from '../restApis';
import {
  CREATE_BINGO,
  UPDATE_BINGO,
  DELETE_BINGO,
  LIST_BINGO,
} from '../constants';

const bingo = restApis('bingo');

export const bingoCreateAction = createApiAction(CREATE_BINGO, bingo.create);
export const bingoUpdateAction = createApiAction(UPDATE_BINGO, bingo.update);
export const bingoDeleteAction = createApiAction(DELETE_BINGO, bingo.remove);
export const bingoListAction = createApiAction(LIST_BINGO, bingo.list);
