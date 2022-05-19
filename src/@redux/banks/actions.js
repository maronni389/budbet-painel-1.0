import { createApiAction } from '../redux-actions';
import restApis from '../restApis';
import {
  LIST_BANKS_ADMIN,
  CREATE_BANK_ADMIN,
  UPDATE_BANK,
} from '../constants';

const banksAdmin = restApis('banks/admin');
const banks = restApis('banks');

export const banksAdminListAction = createApiAction(LIST_BANKS_ADMIN, banksAdmin.list);
export const bankAdminCreateAction = createApiAction(CREATE_BANK_ADMIN, banksAdmin.create);
export const bankUpdateAction = createApiAction(UPDATE_BANK, banks.update);
