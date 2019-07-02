import { getServers, postServer, patchServer, deleteServer} from '../util/server_api_util';

import { joinServer } from './server_memberships_actions';
import { focusServer } from './ui_actions';
import { receiveErrors } from "./errors_actions";

export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const REMOVE_SERVER = "REMOVE_SERVER";

export const receiveServer = server => ({
  type: RECEIVE_SERVER,
  server
});

const receiveServers = servers => ({
  type: RECEIVE_SERVERS,
  servers
});

export const removeServer = serverId => ({
  type: REMOVE_SERVER,
  serverId
});


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
    .then(server => {
      dispatch(receiveServer(server));
    }, errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const destroyServer = serverId => dispatch => (
  deleteServer(serverId)
    .then(payload => {
      dispatch(removeServer(payload.serverId));
      focusServer("@me");
    })
);


