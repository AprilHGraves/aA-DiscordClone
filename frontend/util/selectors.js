

export const selectInvitesByServer = (array, serverId) => {
  return array.filter(invite => invite.server_id == serverId);
};