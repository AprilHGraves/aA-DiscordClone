import { RECEIVE_MESSAGE, RECEIVE_MESSAGES, REMOVE_MESSAGE } from "../../actions/messages_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return Object.assign({}, state, { [action.message.id]: action.message })
    case RECEIVE_MESSAGES:
      return Object.assign({}, state, action.messages)
    case REMOVE_MESSAGE:
      const newObj = Object.assign({}, state);
      delete newObj[action.messageId];
      return newObj
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
}

export default messagesReducer;
