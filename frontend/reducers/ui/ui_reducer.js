import { combineReducers } from 'redux';
import focusReducer from './focus_reducer';
import channelNotesReducer from './channel_notes_reducer';
import modalReducer from './modal_reducer';

const uiReducer = combineReducers({
  focus: focusReducer,
  channel_notes: channelNotesReducer,
  modal: modalReducer
});

export default uiReducer;