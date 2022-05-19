import generateHandleActions from '../state-handler';
import {
  CREATE_BINGOPAYOUT,
  READ_RANKING,
  CLEAR_RANKING,
} from '../constants';

const apiStates = [
  { type: CREATE_BINGOPAYOUT, name: 'winners' },
  { type: READ_RANKING, name: 'ranking' },
  { type: CLEAR_RANKING, name: 'ranking' },
];

// not used useSelector(selectState('bingopayout', 'winners'));

const instantStates = [];
const storage = {};
const listValues = [];

export default generateHandleActions({ apiStates, instantStates, storage, listValues });
