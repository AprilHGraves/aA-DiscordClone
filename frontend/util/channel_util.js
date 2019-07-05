export const getChannels = (serverId) => {
  return $.ajax({
    method: 'GET',
    url: '/api/channels',
    data: { server_id: serverId }
  })
};

export const postChannel = channel => {
  return $.ajax({
    method: 'POST',
    url: '/api/channels',
    data: { channel }
  })
};

export const patchChannel = (id, channel) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/channels/${id}`,
    data: { channel }
  })
};

export const deleteChannel = channelId => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/channels/${channelId}`
  })
};