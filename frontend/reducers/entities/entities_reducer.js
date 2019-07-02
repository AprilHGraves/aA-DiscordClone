import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import serversReducer from './servers_reducer';
import invitesReducer from './invites_reducer';
import serverMembershipsReducer from './server_memberships_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  servers: serversReducer,
  invites: invitesReducer,
  server_memberships: serverMembershipsReducer
});

export default entitiesReducer;