import * as ApiUtil from '../util/user_api_util';

export const RECEIVE_USERS = "RECEIVE_USERS";

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const getUsers = () => dispatch => (
  ApiUtil.getUsers()
    .then(users => dispatch(receiveUsers(users)))
);