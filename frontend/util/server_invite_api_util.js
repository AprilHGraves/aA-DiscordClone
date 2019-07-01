export const getInviteByCode = code => {
  return $.ajax({
    method: 'GET',
    url: '/api/server_invites/code',
    data: { code }
  })
};

export const patchInviteUses = id => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/server_invites/${id}`
  })
};

export const getInviteByUserAndChannel = channelId => {
  return $.ajax({
    method: 'GET',
    url: '/api/server_invites/channel',
    data: { channelId }
  })
};

export const getInvites = serverId => {
  return $.ajax({
    method: 'GET',
    url: '/api/server_invites',
    data: { serverId }
  })
};

export const postInvite = invite => {
  return $.ajax({
    method: 'POST',
    url: '/api/server_invites',
    data: { invite }
  })
};

export const deleteInvite = inviteId => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/server_invites/${inviteId}`
  })
};