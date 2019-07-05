export const getMessages = (containerType, containerId) => {
  return $.ajax({
    method: 'GET',
    url: '/api/messages',
    data: { 
      container_string: containerType,
      container_id: containerId
    }
  })
};

export const postMessage = (body, messagable_type, messagable_id) => {
  return $.ajax({
    method: 'POST',
    url: '/api/messages',
    data: { message: {body, messagable_type, messagable_id} }
  })
};

export const patchMessage = (id, body) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/messages/${id}`,
    data: { message: {body} }
  })
};

export const deleteMessage = messageId => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/messages/${messageId}`
  })
};