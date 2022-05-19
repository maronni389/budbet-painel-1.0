import generateHandleActions from '../state-handler';
import {
  UPDATE_TESTIMONIALS,
  LIST_TESTIMONIALS,
  DELETE_TESTIMONIALS,
} from '../constants';

const apiStates = [
  { type: DELETE_TESTIMONIALS, name: 'testimony' },
  { type: UPDATE_TESTIMONIALS, name: 'testimony' },
  { type: LIST_TESTIMONIALS, name: 'testimonials' },
];

// not used useSelector(selectState('testimonials', 'testimony'));
// { type: UPDATE_TESTIMONIALS, name: 'testimony' }

const instantStates = [];
const storage = {};
const listValues = [];

export default generateHandleActions({ apiStates, instantStates, storage, listValues });
