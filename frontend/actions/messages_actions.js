
import { receiveErrors } from "./errors_actions";
import { getMessages, postMessage, patchMessage, deleteMessage } from "../util/message_api_util";
import { receiveUsers } from "./users_actions";

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";

const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});

export const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages
});

const removeMessage = messageId => ({
  type: REMOVE_MESSAGE,
  messageId
});


export const fetchMessages = (containerType,containerId) => dispatch => (
  getMessages(containerType, containerId)
    .then(payload => {
      dispatch(receiveMessages(payload.messages));
      dispatch(receiveUsers(payload.users));
    })
);

export const createMessageInChannel = (message, channelId)  => dispatch => (
  postMessage(message, "Channel", channelId)
    .then(message => {
      dispatch(receiveMessage(message));
    }, errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const createMessageInDM = (message, dmId) => dispatch => (
  postMessage(message, "DmConversation", dmId)
    .then(message => {
      dispatch(receiveMessage(message));
    }, errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const updateMessage = (id, message) => dispatch => (
  patchMessage(id, message)
    .then(message => {
      dispatch(receiveMessage(message));
    }, errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const destroyMessage = messageId => dispatch => (
  deleteMessage(messageId)
    .then(payload => {
      dispatch(removeMessage(payload.messageId));
    })
);