

export const selectInvitesByServer = (array, serverId) => {
  return array.filter(invite => invite.server_id == serverId);
};

export const selectServerMembershipByServerAndUser = (state, serverId, userId) => {
  
  const allServerMemberships = Object.values(state.entities.server_memberships);
  return allServerMemberships.find(membership => membership.server_id == serverId && membership.user_id == userId);
};

export const selectServerMembershipsByServer = (state, serverId) => {
  const allServerMemberships = Object.values(state.entities.server_memberships);
  return allServerMemberships.filter(membership => membership.server_id == serverId)
};