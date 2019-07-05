import { getDmConversations, postDmConversation, postDmMembership } from "../util/dm_conversation_util";
import { receiveMessages } from "./messages_actions";
import { receiveUsers } from "./users_actions";

export const RECEIVE_DM_CONVERSATIONS = "RECEIVE_DM_CONVERSATIONS";
export const RECEIVE_DM_CONVERSATION = "RECEIVE_DM_CONVERSATION";

const receiveDmConversations = (dmConversations) => {
  return {
    type: RECEIVE_DM_CONVERSATIONS,
    dmConversations
  }
};

const receiveDmConversation = (dmConversation) => {
  return {
    type: RECEIVE_DM_CONVERSATION,
    dmConversation
  }
};

export const fetchDmConversations = () => dispatch => (
  getDmConversations()
    .then(payload => {
      dispatch(receiveDmConversations(payload.dmConversations));
      dispatch(receiveMessages(payload.messages));
      dispatch(receiveUsers(payload.users));
    })
);

export const createDmConversation = (myId, theirId) => dispatch => (
  postDmConversation()
    .then(dm_conversation => {
      postDmMembership(dm_conversation.id, myId)
      postDmMembership(dm_conversation.id, theirId)
      dispatch(receiveDmConversation(dm_conversation))
    })
);