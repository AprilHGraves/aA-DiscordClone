export const getServers = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/servers'
  })
};

export const getServerByLink = link => {
  return $.ajax({
    method: 'GET',
    url: '/api/servers/link',
    data: { link }
  })
}
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

export const deleteServer = server => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/servers/${server.id}`
  })
};

export const postServerMembership = server => {
  return $.ajax({
    method: 'POST',
    url: '/api/server_memberships',
    data: { server_id: server.id }
  })
}

export const deleteServerMembership = id => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/server_memberships/${id}`
  })
}