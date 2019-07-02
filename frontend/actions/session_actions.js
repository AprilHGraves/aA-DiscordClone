import { deleteSession, postSession } from '../util/session_api_util';
import { receiveErrors } from './errors_actions';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
})

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
})

export const login = user => dispatch => (
  postSession(user)
    .then(user => {
      dispatch(receiveCurrentUser(user))      
    }, errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const logout = () => dispatch => (
  deleteSession()
    .then(() => dispatch(logoutCurrentUser()))
);

