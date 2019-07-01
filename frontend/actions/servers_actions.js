import { getServers, postServer, patchServer, deleteServer} from '../util/server_api_util';
import { getInviteByCode, patchInviteUses } from '../util/server_invite_api_util';
import { postServerMembership, deleteServerMembership, patchServerMembership } from '../util/server_membership_api_util';
import { receiveErrors } from "./errors_actions";
import { focusServer } from './ui_actions';

export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const REMOVE_SERVER = "REMOVE_SERVER";

const receiveServer = server => ({
  type: RECEIVE_SERVER,
  server
});

const receiveServers = servers => ({
  type: RECEIVE_SERVERS,
  servers
});

//remove server from state.entities.servers
const removeServer = serverId => ({
  type: REMOVE_SERVER,
  serverId
});

export const joinServerByCode = (code) => dispatch => (
  getInviteByCode(code)
    .then(invite => {
      dispatch(
        joinServer(invite.server_id)          
      ).then(() => (patchInviteUses(invite.id)));
      return invite.server_id
    }, errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const fetchServers = () => dispatch => (
  getServers()
    .then(servers => dispatch(receiveServers(servers)))
);

export const createServer = server => dispatch => (
  postServer(server)
    .then(server => {
      dispatch(joinServer(server.id));
      return server.id
    }, errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const updateServer = (id, server) => dispatch => (
  patchServer(id, server)
    .then(server => dispatch(receiveServer(server)), errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const destroyServer = serverId => dispatch => (
  deleteServer(serverId)
    .then(payload => {
      dispatch(removeServer(payload.serverId));
      focusServer("@me");
    })
);

export const joinServer = serverId => dispatch => (
  postServerMembership(serverId)
    .then(server => {
      dispatch(receiveServer(server));
      dispatch(focusServer(server.id));
    }, errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const leaveServer = serverMembershipId => dispatch => (
  deleteServerMembership(serverMembershipId)
    .then(payload => {
      dispatch(removeServer(payload.serverId));
      dispatch(focusServer("@me"));
    })
);
