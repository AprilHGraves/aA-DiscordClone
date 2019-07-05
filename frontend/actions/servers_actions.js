import { getServers, postServer, patchServer, deleteServer} from '../util/server_api_util';

import { joinServer } from './server_memberships_actions';
import { focusServer, noteChannels } from './ui_actions';
import { receiveErrors } from "./errors_actions";
import { createChannel, receiveChannels } from './channels_actions';
import { receiveUsers } from './users_actions';
import { receiveMessages } from './messages_actions';

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


export const fetchServers = (urlMatch) => dispatch => (
  getServers(urlMatch)
    .then(payload => {
      dispatch(receiveServers(payload.servers));
      dispatch(receiveChannels(payload.channels))
      dispatch(receiveUsers(payload.users));
      dispatch(receiveMessages(payload.messages));
      return {servers: payload.servers, channels: payload.channels, urlMatch}
    })
);

export const createServer = server => dispatch => (
  postServer(server)
    .then(server => {
      dispatch(joinServer(server.id));
      dispatch(createChannel({
        name: "general",
        server_id: server.id
      }));
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
      dispatch(focusServer("@me"));
    })
);


