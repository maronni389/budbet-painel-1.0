import { createApiAction } from '../redux-actions';
import restApis from '../restApis';
import {
  CREATE_RULE,
  UPDATE_RULE,
  DELETE_RULE,
  LIST_RULE,
  READ_RULE_GAME,
} from '../constants';

const rules = restApis('rules');
const rulesgame = restApis('rules/game');

export const ruleCreateAction = createApiAction(CREATE_RULE, rules.create);
export const ruleReadByGameAction = createApiAction(READ_RULE_GAME, rulesgame.read);
export const ruleUpdateAction = createApiAction(UPDATE_RULE, rules.update);
export const ruleDeleteAction = createApiAction(DELETE_RULE, rules.remove); // not used yet
export const ruleListAction = createApiAction(LIST_RULE, rules.list);
