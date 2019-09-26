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
      dispatch(receiveUsers(payload.users));
      dispatch(receiveDmConversations(payload.dm_conversations));
    })
);

export const createDmConversation = (myId, theirId) => dispatch => (
  postDmConversation()
    .then(payload => {
      const dmConversation = payload.dm_conversation;
      postDmMembership(dmConversation.id, myId);
      postDmMembership(dmConversation.id, theirId);
      dispatch(receiveDmConversation(dmConversation))
      return dmConversation
    })
);