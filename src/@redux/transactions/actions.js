import { createApiAction } from '../redux-actions';
import restApis from '../restApis';
import {
  UPDATE_TRANSACTION,
  CREATE_TRANSACTION,
  LIST_TRANSACTION,
} from '../constants';

const transactions = restApis('transactions');
const transactionsAll = restApis('transactions/all');

export const transactionUpdateAction = createApiAction(UPDATE_TRANSACTION, transactions.update);
export const transactionCreateAction = createApiAction(CREATE_TRANSACTION, transactions.create);
export const transactionListAction = createApiAction(LIST_TRANSACTION, transactionsAll.list);
