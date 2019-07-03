import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";
import { NOTE_CHANNEL, NOTE_CHANNELS } from "../../actions/ui_actions";


const channelNotesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case NOTE_CHANNEL:
      return Object.assign({}, state, { [action.note.serverId]: action.note.channelId });
    case NOTE_CHANNELS:
      const channels = action.channels;
      const newObj = {};
      for (const id in channels) {
        const channel = channels[id];
        if (!newObj[channel.server_id]) {
          newObj[channel.server_id] = channel.id;
        }
      }
      return newObj
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
}

export default channelNotesReducer;