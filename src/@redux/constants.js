// REDUX ROUTES to CREATE/UPDATE/LIST

// Auth
export const LOGIN = 'auth/LOGIN';
export const LOGOUT = 'auth/LOGOUT';
export const RECOVER_PASSWORD = 'auth/RECOVER_PASSWORD';
export const RESET_PASSWORD = 'auth/RESET_PASSWORD';
export const REFRESH_TOKEN = 'auth/REFRESH_TOKEN';

// ui
export const GLOBAL_NOTIFICATION = 'ui/GLOBAL_NOTIFICATION';
export const SET_APP_TITLE = 'ui/SET_APP_TITLE';
export const CLEAR_APP_TITLE = 'ui/CLEAR_APP_TITLE';

// users
export const CREATE_USER = 'users/CREATE_USER';
export const READ_USER = 'users/READ_USER';
export const UPDATE_USER = 'users/UPDATE_USER';
export const LIST_USERS = 'users/LIST_USERS';
export const CLEAR_USER = 'users/CLEAR_USER';
export const DELETE_USER = 'users/DELETE_USER';
export const SEND_CONFIRM_USER = 'users/SEND_CONFIRM_USER';
export const CONFIRM_USER_EMAIL = 'users/CONFIRM_USER_EMAIL';

// balance
export const GET_BALANCE = 'balance/GET_BALANCE';
export const LIST_BINGO_OPENED = 'balance/LIST_BINGO_OPENED';
export const LIST_BINGO_CLOSED = 'balance/LIST_BINGO_CLOSED';

// banks
export const LIST_BANKS_ADMIN = 'banks/LIST_BANKS_ADMIN';
export const CREATE_BANK_ADMIN = 'banks/CREATE_BANK_ADMIN';
export const UPDATE_BANK = 'banks/UPDATE_BANK';
export const DELETE_BANK = 'banks/DELETE_BANK'; // non-used yet

// transactions
export const UPDATE_TRANSACTION = 'transactions/UPDATE_TRANSACTION';
export const CREATE_TRANSACTION = 'transactions/CREATE_TRANSACTION';
export const LIST_TRANSACTION = 'transactions/LIST_TRANSACTION';

// testimonials
export const LIST_TESTIMONIALS = 'testimonials/LIST_TESTIMONIALS';
export const UPDATE_TESTIMONIALS = 'testimonials/UPDATE_TESTIMONIALS';
export const DELETE_TESTIMONIALS = 'testimonials/DELETE_TESTIMONIALS';

// BINGO
export const CREATE_BINGO = 'bingo/CREATE_BINGO';
export const UPDATE_BINGO = 'bingo/UPDATE_BINGO';
export const DELETE_BINGO = 'bingo/DELETE_BINGO';
export const LIST_BINGO = 'bingo/LIST_BINGO';

// bingobets
export const LIST_BINGOBETS = 'bingobets/LIST_BINGOBETS';
export const CREATE_BINGOBETS = 'bingobets/CREATE_BINGOBETS';
export const DELETE_BINGOBETS = 'bingobets/DELETE_BINGOBETS';
export const CREATE_RANKING = 'bingobets/CREATE_RANKING';

// bingodrawns
export const CREATE_BINGODRAWN = 'bingodrawns/CREATE_BINGODRAWN';

// rules
export const CREATE_RULE = 'rules/CREATE_RULE';
export const UPDATE_RULE = 'rules/UPDATE_RULE';
export const DELETE_RULE = 'rules/DELETE_RULE';
export const READ_RULE_GAME = 'rules/READ_RULE_GAME';
export const LIST_RULE = 'rules/LIST_RULE';

export const UPLOAD_TERMS = 'upload/UPLOAD_TERMS ';

// faq
export const CREATE_FAQ = 'faq/CREATE_FAQ';
export const UPDATE_FAQ = 'faq/UPDATE_FAQ';
export const LIST_FAQ = 'faq/LIST_FAQ';
export const DELETE_FAQ = 'faq/DELETE_FAQ';

// bingopayout
export const CREATE_BINGOPAYOUT = 'bingopayout/CREATE_BINGOPAYOUT';
export const READ_RANKING = 'bingopayout/READ_RANKING';
export const CLEAR_RANKING = 'bingopayout/CLEAR_RANKING';

// brazilianbanks
export const CREATE_BRAZILIANBANK = 'brazilianbanks/CREATE_BRAZILIANBANK';
export const LIST_BRAZILIANBANK = 'brazilianbanks/LIST_BRAZILIANBANK';
export const UPDATE_BRAZILIANBANK = 'brazilianbanks/UPDATE_BRAZILIANBANK';
export const DELETE_BRAZILIANBANK = 'brazilianbanks/DELETE_BRAZILIANBANK';

// globals
export const LIST_GLOBAL = 'globals/LIST_GLOBAL';
export const READ_GLOBAL = 'globals/READ_GLOBAL';
export const UPDATE_GLOBAL = 'globals/UPDATE_GLOBAL';
export const DELETE_GLOBAL = 'globals/DELETE_GLOBAL';
