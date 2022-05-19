import { createApiAction } from '../redux-actions';
import restApis from '../restApis';
import { CREATE_BINGODRAWN } from '../constants';

const bingodrawn = restApis('bingodrawn');

export const bingodrawnCreateAction = createApiAction(CREATE_BINGODRAWN, bingodrawn.create);
