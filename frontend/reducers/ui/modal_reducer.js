import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";
import { RECEIVE_MODAL } from "../../actions/ui_actions";

const modalReducer = (state = "none", action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MODAL:
      return action.modalName
    case LOGOUT_CURRENT_USER:
      return "none";
    default:
      return state;
  }
}

export default modalReducer