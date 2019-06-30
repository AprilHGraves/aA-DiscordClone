export const getServerByLink = link => {
  return $.ajax({
    method: 'GET',
    url: '/api/server_invites/link',
    data: { link }
  })
};