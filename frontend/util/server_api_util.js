export const getServers = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/servers'
  })
};

export const postServer = formData => {
  return $.ajax({
    method: 'POST',
    url: '/api/servers',
    data: formData,
    contentType: false,
    processData: false
  })
};

export const patchServer = (id, formData) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/servers/${id}`,
    data: formData,
    contentType: false,
    processData: false
  })
};

export const deleteServer = serverId => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/servers/${serverId}`
  })
};