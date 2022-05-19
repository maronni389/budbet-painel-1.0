import generateHandleActions from '../state-handler';
import {
  CREATE_FAQ,
  UPDATE_FAQ,
  LIST_FAQ,
  DELETE_FAQ,
} from '../constants';

const apiStates = [
  { type: CREATE_FAQ, name: 'faq' },
  { type: DELETE_FAQ, name: 'faq' },
  { type: UPDATE_FAQ, name: 'faq' },
  { type: LIST_FAQ, name: 'faqs' },
];

// not used useSelector(selectState('faq', 'faq'));

const instantStates = [];
const storage = {};
const listValues = [];

export default generateHandleActions({ apiStates, instantStates, storage, listValues });
