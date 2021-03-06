import { RECEIVE_INVITE, RECEIVE_INVITES, REMOVE_INVITE } from "../../actions/invites_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";

const invitesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_INVITE:
      return Object.assign({}, state, { [action.invite.id]: action.invite })
    case RECEIVE_INVITES:
      return Object.assign({}, state, action.invites)
    case REMOVE_INVITE:
      const newObj = Object.assign({}, state);
      delete newObj[action.inviteId];
      return newObj
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
}

export default invitesReducer;
