import generateHandleActions from '../state-handler';
import { CREATE_BINGODRAWN } from '../constants';

const apiStates = [
  { type: CREATE_BINGODRAWN, name: 'drawn' },
];

const instantStates = [];
const storage = {};
const listValues = [];

export default generateHandleActions({ apiStates, instantStates, storage, listValues });
