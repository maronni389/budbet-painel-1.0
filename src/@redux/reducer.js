import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './auth/reducer';
import ui from './ui/reducer';
import users from './users/reducer';
import balance from './balance/reducer';
import banks from './banks/reducer';
import transactions from './transactions/reducer';
import testimonials from './testimonials/reducer';
import bingo from './bingo/reducer';
import bingobets from './bingobets/reducer';
import bingodrawns from './bingodrawns/reducer';
import bingopayout from './bingopayout/reducer';
import rules from './rules/reducer';
import faq from './faq/reducer';
import upload from './upload/reducer';
import brazilianbanks from './brasilianbanks/reducer';
import globals from './globals/reducer';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  ui,
  auth,
  users,
  balance,
  banks,
  transactions,
  testimonials,
  bingo,
  bingobets,
  bingodrawns,
  bingopayout,
  rules,
  faq,
  upload,
  brazilianbanks,
  globals,
});

export default rootReducer;
