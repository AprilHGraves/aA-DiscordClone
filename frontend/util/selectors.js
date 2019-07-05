

export const selectInvitesByServer = (state, serverId) => {
  const allInvites = Object.values(state.entities.invites);
  return allInvites.filter(invite => invite.server_id == serverId);
};

export const selectInvitesByChannel = (state, channelId) => {
  const allInvites = Object.values(state.entities.invites);
  return allInvites.filter(invite => invite.channel_id == channelId);
};

export const selectServerMembershipByServerAndUser = (state, serverId, userId) => {
  const allServerMemberships = Object.values(state.entities.server_memberships);
  return allServerMemberships.find(membership => membership.server_id == serverId && membership.user_id == userId);
};

export const selectServerMembershipsByServer = (state, serverId) => {
  const allServerMemberships = Object.values(state.entities.server_memberships);
  return allServerMemberships.filter(membership => membership.server_id == serverId)
};

export const selectChannelsByServerId = (state, serverId) => {
  const allChannels = Object.values(state.entities.channels);
  return allChannels.filter(channel => channel.server_id == serverId)
};

export const selectFirstChannelInServer = (state, serverId) => {
  const allChannels = Object.values(state.entities.channels);
  return allChannels.find(channel => channel.server_id == serverId)
}

export const selectMessagesByChannel = (state, channelId) => {
  const allMessages = Object.values(state.entities.messages);
  return allMessages.filter(message => message.messagable_id == channelId && message.messagable_type == "Channel")
}