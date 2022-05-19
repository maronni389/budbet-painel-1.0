import { createApiAction } from '../redux-actions';
import restApis from '../restApis';
import {
  LIST_GLOBAL,
  READ_GLOBAL,
  UPDATE_GLOBAL,
  DELETE_GLOBAL,
} from '../constants';

const globalsAPI = restApis('globals');

export const globalsReadAction = createApiAction(READ_GLOBAL, globalsAPI.read);
export const globalsListAction = createApiAction(LIST_GLOBAL, globalsAPI.list);
export const globalsUpdateAction = createApiAction(UPDATE_GLOBAL, globalsAPI.update);
export const globalsDeleteAction = createApiAction(DELETE_GLOBAL, globalsAPI.remove);

// contants
export const PERCENTUAL_INDICACAO = 'percentualindicacao';
