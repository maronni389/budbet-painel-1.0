import { createApiAction, createClearAction } from '../redux-actions';
import restApis from '../restApis';
import {
  CREATE_USER,
  READ_USER,
  UPDATE_USER,
  LIST_USERS,
  CLEAR_USER,
  DELETE_USER,
  SEND_CONFIRM_USER,
  CONFIRM_USER_EMAIL,
} from '../constants';

const users = restApis('users');
const confirmEmailApi = restApis('users/confirmemail');

export const sendConfirmEmailAction = createApiAction(SEND_CONFIRM_USER, confirmEmailApi.read);
export const confirmEmailAction = createApiAction(CONFIRM_USER_EMAIL, confirmEmailApi.update);

export const userCreateAction = createApiAction(CREATE_USER, users.create);
export const userReadAction = createApiAction(READ_USER, users.read);
export const userUpdateAction = createApiAction(UPDATE_USER, users.update);
export const userDeleteAction = createApiAction(DELETE_USER, users.remove);
export const usersListAction = createApiAction(LIST_USERS, users.list);
export const clearUserAction = createClearAction(CLEAR_USER);
