import { createApiAction } from '../redux-actions';
import restApis from '../restApis';
import { UPLOAD_TERMS } from '../constants';

const upload = restApis('upload/PDF');
// Endpoint removido

export const uploadTermsAction = createApiAction(UPLOAD_TERMS, upload.create);
