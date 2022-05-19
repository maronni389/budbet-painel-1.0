import generateHandleActions from '../state-handler';
import { LOGIN, LOGOUT, RECOVER_PASSWORD, RESET_PASSWORD, REFRESH_TOKEN } from '../constants';

const apiStates = [
  { type: LOGIN, name: 'tokenInfo' },
  { type: LOGOUT, name: 'tokenInfo' },
  { type: RECOVER_PASSWORD, name: 'tokenInfo' },
  { type: RESET_PASSWORD, name: 'tokenInfo' },
  { type: REFRESH_TOKEN, name: 'tokenInfo' },
];

const instantStates = [];
const storage = {
  tokenInfo: 'tokenInfo',
};
const listValues = [];

export default generateHandleActions({ apiStates, instantStates, storage, listValues });
