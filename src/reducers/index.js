import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import trivia from './triviaReducer';

const rootReducer = combineReducers({ loginReducer, trivia });

export default rootReducer;
