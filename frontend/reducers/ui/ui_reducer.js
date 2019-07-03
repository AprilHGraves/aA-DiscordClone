import { combineReducers } from 'redux';
import focusReducer from './focus_reducer';
import channelNotesReducer from './channel_notes_reducer';

const uiReducer = combineReducers({
  focus: focusReducer,
  channel_notes: channelNotesReducer
});

export default uiReducer;