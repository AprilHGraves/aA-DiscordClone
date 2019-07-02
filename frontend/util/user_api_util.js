
export const postUser = user => {
  return $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user }
  })
};

export const patchUser = (id, formData) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${id}`,
    data: formData,
    contentType: false,
    processData: false
  })
};

export const deleteUser = user => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/users/${user.id}`
  })
};