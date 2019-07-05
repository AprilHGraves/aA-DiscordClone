import { patchUser, deleteUser, postUser } from '../util/user_api_util';
import { receiveCurrentUser, logoutCurrentUser } from './session_actions';
import { receiveErrors } from './errors_actions';

export const RECEIVE_USERS = "RECEIVE_USERS";

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const signup = user => dispatch => (
 postUser(user)
    .then(user => {
      dispatch(receiveCurrentUser(user));
    }, errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const editUser = (id, user, oldPW, newPW) => dispatch => (
  patchUser(id, user, oldPW, newPW)
    .then(user => dispatch(receiveCurrentUser(user)), errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const destroyUser = user => dispatch => (
  deleteUser(user)
    .then(() => dispatch(logoutCurrentUser()))
);
