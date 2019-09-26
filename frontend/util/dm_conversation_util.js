
export const getDmConversations = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/dm_conversations'
  })
};

export const postDmConversation = () => {
  return $.ajax({
    method: 'POST',
    url: '/api/dm_conversations'
  })
};


export const postDmMembership = (dmId, userId) => {
  return $.ajax({
    method: 'POST',
    url: 'api/dm_memberships',
    data: { membership: {dm_id: dmId, user_id: userId} }
  })
};