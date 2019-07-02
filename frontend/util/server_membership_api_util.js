export const getServerMembershipsByServerId = serverId => {
  return $.ajax({
    method: 'GET',
    url: '/api/server_memberships',
    data: { serverId }
  })
}

export const postServerMembership = serverId => {
  return $.ajax({
    method: 'POST',
    url: '/api/server_memberships',
    data: { serverId }
  })
}

export const deleteServerMembership = membershipId => {
  debugger;
  return $.ajax({
    method: 'DELETE',
    url: `/api/server_memberships/${membershipId}`
  })
}

export const patchServerMembership = (id, nickname) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/server_memberships/${id}`,
    data: { nickname }
  })
}