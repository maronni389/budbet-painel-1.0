import { createApiAction } from '../redux-actions';
import restApis from '../restApis';
import {
  CREATE_FAQ,
  UPDATE_FAQ,
  LIST_FAQ,
  DELETE_FAQ,
} from '../constants';

const faq = restApis('faq');

export const faqCreateAction = createApiAction(CREATE_FAQ, faq.create);
export const faqDeleteAction = createApiAction(DELETE_FAQ, faq.remove);
export const faqUpdateAction = createApiAction(UPDATE_FAQ, faq.update);
export const faqListAction = createApiAction(LIST_FAQ, faq.list);
