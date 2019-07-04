import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";
import { NOTE_CHANNEL } from "../../actions/ui_actions";
import { RECEIVE_CHANNELS, RECEIVE_CHANNEL } from "../../actions/channels_actions";


const channelNotesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHANNEL:
      return Object.assign({}, state, { [action.channel.server_id]: action.channel.id})
    case NOTE_CHANNEL:
      return Object.assign({}, state, { [action.note.serverId]: action.note.channelId });
    case RECEIVE_CHANNELS:
      const channels = action.channels;
      const newObj = Object.assign({}, state);
      for (const id in channels) {
        const channel = channels[id];
        if (!newObj[channel.server_id]) {
          newObj[channel.server_id] = channel.id;
        }
      }
      return Object.assign({}, state, newObj)
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
}

export default channelNotesReducer;