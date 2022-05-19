import { createApiAction } from '../redux-actions';
import restApis from '../restApis';
import {
  LIST_BINGOBETS,
  CREATE_RANKING,
  CREATE_BINGOBETS,
} from '../constants';

const bingobet = restApis('bingobet');
const ranking = restApis('bingobet/ranking');

export const bingobetListAction = createApiAction(LIST_BINGOBETS, bingobet.list);
export const bingobetCreateAction = createApiAction(CREATE_BINGOBETS, bingobet.create);
export const rankingCreateAction = createApiAction(CREATE_RANKING, ranking.update);
