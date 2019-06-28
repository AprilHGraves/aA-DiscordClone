export const postServer = server => {
  return $.ajax({
    method: 'POST',
    url: '/api/servers',
    data: { server }
  })
};

export const patchUser = (id, server) => {
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
    data: { server }
  })
}

export const deleteServerMembership = id => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/server_memberships/${id}`
  })
}