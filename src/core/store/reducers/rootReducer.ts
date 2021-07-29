import { combineReducers } from 'redux';
import currentAuth from './currentAuth';

const rootReducer = combineReducers({
  currentAuth,
});

export default rootReducer;
