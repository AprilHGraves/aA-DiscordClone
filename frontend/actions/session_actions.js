import * as ApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";


const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
})

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
})

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
})

export const signup = user => dispatch => (
  ApiUtil.postUser(user)
    .then(user => dispatch(receiveCurrentUser(user)), errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const editUser = user => dispatch => (
  ApiUtil.patchUser(user)
    .then(user => dispatch(receiveCurrentUser(user)), errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const deleteUser = user => dispatch => (
  ApiUtil.deleteUser(user)
    .then(() => dispatch(logoutCurrentUser()))
)

export const logout = () => dispatch => (
  ApiUtil.deleteSession()
    .then(() => dispatch(logoutCurrentUser()))
);

export const login = user => dispatch => (
  ApiUtil.postSession(user)
    .then(user => dispatch(receiveCurrentUser(user)), errors => dispatch(receiveErrors(errors.responseJSON)))
);