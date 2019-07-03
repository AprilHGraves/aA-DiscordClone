import { RECEIVE_CHANNEL, RECEIVE_CHANNELS, REMOVE_CHANNEL } from "../../actions/channels_actions";


const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHANNEL:
      return Object.assign({}, state, { [action.channel.id]: action.channel })
    case RECEIVE_CHANNELS:
      return Object.assign({}, state, action.channels)
    case REMOVE_CHANNEL:
      const newObj = Object.assign({}, state);
      delete newObj[action.channelId];
      return newObj
    default:
      return state;
  }
}

export default channelsReducer;
