import { getInviteByUserAndChannel, getInvites, postInvite, deleteInvite } from '../util/server_invite_api_util';
import { receiveErrors } from "./errors_actions";

export const RECEIVE_INVITE = "RECEIVE_INVITE";
export const RECEIVE_INVITES = "RECEIVE_INVITES";
export const REMOVE_INVITE = "REMOVE_INVITE";

const receiveInvite = invite => ({
  type: RECEIVE_INVITE,
  invite
});

const receiveInvites = invites => ({
  type: RECEIVE_INVITES,
  invites
});

const removeInvite = inviteId => ({
  type: REMOVE_INVITE,
  inviteId
});

export const fetchInviteByUserAndChannel = (channelId) => dispatch => (
  getInviteByUserAndChannel(channelId)
    .then(invite => {
      dispatch(receiveInvite(invite))
      return invite
    })
);

export const fetchInvites = (serverId) => dispatch => (
  getInvites(serverId)
    .then(invites => dispatch(receiveInvites(invites)))
);

export const createInvite = invite => dispatch => {
  return postInvite(invite)
    .then(invite => {
      dispatch(receiveInvite(invite));
      return invite
    }, errors => dispatch(receiveErrors(errors.responseJSON)))
};

export const destroyInvite = inviteId => dispatch => (
  deleteInvite(inviteId)
    .then(payload => {
      dispatch(removeInvite(payload.inviteId));
    })
);