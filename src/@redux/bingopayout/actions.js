import { createApiAction, createClearAction } from '../redux-actions';
import restApis from '../restApis';
import {
  CREATE_BINGOPAYOUT,
  READ_RANKING,
  CLEAR_RANKING,
} from '../constants';

const bingopayout = restApis('bingopayout');
const bingopayoutRankingApi = restApis('bingopayout/ranking');

export const bingopayoutCreateAction = createApiAction(CREATE_BINGOPAYOUT, bingopayout.create);
export const bingopayoutRankingAction = createApiAction(READ_RANKING, bingopayoutRankingApi.read);
export const bingoRankingClearAction = createClearAction(CLEAR_RANKING);
