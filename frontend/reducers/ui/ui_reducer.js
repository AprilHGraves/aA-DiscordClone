import { combineReducers } from 'redux';
import focusReducer from './focus_reducer';

const uiReducer = combineReducers({
  focus: focusReducer,
});

export default uiReducer;