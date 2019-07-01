import { RECEIVE_INVITE, RECEIVE_INVITES, REMOVE_INVITE } from "../../actions/invites_actions";


const invitesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_INVITE:
      return Object.assign({}, state, { [action.invite.id]: action.invite })
    case RECEIVE_INVITES:
      return action.invites
    case REMOVE_INVITE:
      const newObj = Object.assign({}, state);
      delete newObj[action.inviteId];
      return newObj
    default:
      return state;
  }
}

export default invitesReducer;
