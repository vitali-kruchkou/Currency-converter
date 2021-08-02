import { combineReducers } from 'redux';
import currentAuth from './currentAuth';
import currentConverter from './currentConverter';

const rootReducer = combineReducers({
  currentAuth,
  currentConverter,
});

export default rootReducer;
