import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";
import { FOCUS_SERVER } from "../../actions/ui_actions";
import { RECEIVE_SERVER } from "../../actions/servers_actions";



const focusReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SERVER:
      return Object.assign({}, state, {server: action.server.id});
    case FOCUS_SERVER:
      return Object.assign({}, state, {server: action.serverId});
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
}

export default focusReducer;