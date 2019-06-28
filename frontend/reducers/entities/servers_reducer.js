import { RECEIVE_SERVER, RECEIVE_SERVERS, REMOVE_SERVER } from "../../actions/servers_actions";


const serversReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SERVER:
      return Object.assign({}, state, { [action.server.id]: action.server})
    case RECEIVE_SERVERS:
      return action.servers
    case REMOVE_SERVER:
      const newObj = Object.assign({}, state);
      delete newObj[action.serverId];
      return newObj
    default:
      return state;
  }
}

export default serversReducer;
