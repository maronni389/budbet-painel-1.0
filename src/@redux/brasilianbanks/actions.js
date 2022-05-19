import { createApiAction } from '../redux-actions';
import restApis from '../restApis';
import {
  CREATE_BRAZILIANBANK,
  LIST_BRAZILIANBANK,
  UPDATE_BRAZILIANBANK,
  DELETE_BRAZILIANBANK,
} from '../constants';

const brazilianbanksAPI = restApis('brazilianbanks');

export const brazilianbanksCreateAction = createApiAction(
  CREATE_BRAZILIANBANK,
  brazilianbanksAPI.create,
);
export const brazilianbanksListAction = createApiAction(LIST_BRAZILIANBANK, brazilianbanksAPI.list);
export const brazilianbanksUpdateAction = createApiAction(
  UPDATE_BRAZILIANBANK,
  brazilianbanksAPI.update,
);
export const brazilianbanksDeleteAction = createApiAction(
  DELETE_BRAZILIANBANK,
  brazilianbanksAPI.remove,
);
