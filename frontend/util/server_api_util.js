export const getServers = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/servers'
  })
};

export const postServer = server => {
  return $.ajax({
    method: 'POST',
    url: '/api/servers',
    data: { server }
  })
};

export const patchServer = (id, server) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/servers/${id}`,
    data: { server }
  })
};

export const deleteServer = serverId => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/servers/${serverId}`
  })
};