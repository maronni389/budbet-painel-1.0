import generateHandleActions from '../state-handler';
import { UPLOAD_TERMS } from '../constants';

const apiStates = [
  { type: UPLOAD_TERMS, name: 'upload' },
];

// not used useSelector(selectState('upload', 'upload'));

const instantStates = [];
const storage = {};
const listValues = [];

export default generateHandleActions({ apiStates, instantStates, storage, listValues });
