import { createApiAction } from '../redux-actions';
import restApis from '../restApis';
import {
  UPDATE_TESTIMONIALS,
  LIST_TESTIMONIALS,
  DELETE_TESTIMONIALS,
} from '../constants';

const testimonials = restApis('testimonials');
const testimonialsAll = restApis('testimonials/all');

export const testimonyDeleteAction = createApiAction(DELETE_TESTIMONIALS, testimonials.remove);
export const testimonyUpdateAction = createApiAction(UPDATE_TESTIMONIALS, testimonials.update);
export const testimonialsListAction = createApiAction(LIST_TESTIMONIALS, testimonialsAll.list);
