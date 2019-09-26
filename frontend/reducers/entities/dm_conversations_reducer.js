import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";
import { RECEIVE_DM_CONVERSATION, RECEIVE_DM_CONVERSATIONS } from "../../actions/dm_conversations_actions";

const dmConversationsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_DM_CONVERSATION:
      return Object.assign({}, state, { [action.dmConversation.id]: action.dmConversation })
    case RECEIVE_DM_CONVERSATIONS:
      return Object.assign({}, state, action.dmConversations)
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
}

export default dmConversationsReducer;
