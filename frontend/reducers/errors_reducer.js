import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_ERRORS } from "../actions/errors_actions";

const sessionErrorsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {};
    case RECEIVE_ERRORS:
      return action.errors
    default:
      return state;
  }
}

export default sessionErrorsReducer;