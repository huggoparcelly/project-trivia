import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import trivia from './triviaReducer';
import timer from './timerReducer';

const rootReducer = combineReducers({ loginReducer, trivia, timer });

export default rootReducer;
