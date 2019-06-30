import { getServers, postServer, patchServer, deleteServer} from '../util/server_api_util';
import { getServerByLink } from '../util/server_invite_api_util';
import { postServerMembership, deleteServerMembership } from '../util/server_membership_api_util';
import { receiveErrors } from "./errors_actions";

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

export const joinServerByLink = (link) => dispatch => (
  getServerByLink(link)
    .then(server => {
      dispatch(joinServer(server));
    }, errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const fetchServers = () => dispatch => (
  getServers()
    .then(servers => dispatch(receiveServers(servers)))
);

export const createServer = server => dispatch => (
  postServer(server)
    .then(server => dispatch(receiveServer(server)), errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const updateServer = server => dispatch => (
  patchServer(server)
    .then(server => dispatch(receiveServer(server)), errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const destroyServer = server => dispatch => (
  deleteServer(server)
    .then(serverId => dispatch(removeServer(serverId)))
);

export const joinServer = server => dispatch => (
  postServerMembership(server)
    .then(server => dispatch(receiveServer(server)), errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const leaveServer = server => dispatch => (
  deleteServerMembership(server)
    .then(payload => dispatch(removeServer(payload.serverId)))
);
