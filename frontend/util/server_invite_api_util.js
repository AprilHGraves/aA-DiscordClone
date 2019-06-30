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
}