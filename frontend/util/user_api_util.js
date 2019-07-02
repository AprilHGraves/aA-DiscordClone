export const getUsers = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/users'
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