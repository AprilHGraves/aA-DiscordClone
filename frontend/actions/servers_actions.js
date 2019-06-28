import * as ApiUtil from '../util/server_api_util';
import { receiveErrors } from "./errors_actions";

export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const REMOVE_SERVER = "REMOVE_SERVER";

const receiveServer = server => ({
  type: RECEIVE_SERVER,
  server
});


//remove server from state.entities.servers
const removeServer = serverId => ({
  type: REMOVE_SERVER,
  serverId
});

export const postServer = server => dispatch => (
  ApiUtil.postServer(server)
    .then(server => dispatch(receiveServer(server)), errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const updateServer = server => dispatch => (
  ApiUtil.updateServer(server)
    .then(server => dispatch(receiveServer(server)), errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const deleteServer = server => dispatch => (
  ApiUtil.deleteServer(server)
    .then(serverId => dispatch(removeServer(serverId)))
);

export const joinServer = server => dispatch => (
  ApiUtil.postServerMembership(server)
    .then(server => dispatch(receiveServer(server)), errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const leaveServer = server => dispatch => (
  ApiUtil.deleteServerMembership(server)
    .then(payload => dispatch(removeServer(payload.serverId)))
);
