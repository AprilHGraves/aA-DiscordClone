import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";



const focusReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
}

export default focusReducer;