import { createApiAction, createClearAction } from '../redux-actions';
import restApis from '../restApis';
import { LOGIN, LOGOUT, RECOVER_PASSWORD, RESET_PASSWORD, REFRESH_TOKEN } from '../constants';

const loginApi = restApis('auth/loginadmin');
const sendRecoverEmailApi = restApis('auth/send-recover-email');
const resetPasswordApi = restApis('auth/reset-password');
const refreshToken = restApis('auth/refreshtoken');

export const refreshTokenAction = createApiAction(REFRESH_TOKEN, refreshToken.list);
export const loginAction = createApiAction(LOGIN, loginApi.create);
export const logoutAction = createClearAction(LOGOUT);
export const sendRecoverEmailAction = createApiAction(RECOVER_PASSWORD, sendRecoverEmailApi.create);
export const resetPasswordAction = createApiAction(RESET_PASSWORD, resetPasswordApi.create);
