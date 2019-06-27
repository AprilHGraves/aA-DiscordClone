export const postUser = user => {
  return $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user }
  })
};

export const patchUser = (id, user, oldPW, newPW) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${id}`,
    data: { user, oldPW, newPW }
  })
}

export const deleteUser = user => {
  return $.ajax({
    method: `DELETE`,
    url: `/api/users/${user.id}`
  })
}

export const postSession = user => {
  return $.ajax({
    method: 'POST',
    url: 'api/session',
    data: { user }
  })
}

export const deleteSession = () => {
  return $.ajax({
    method: "DELETE",
    url: '/api/session'
  })
}
