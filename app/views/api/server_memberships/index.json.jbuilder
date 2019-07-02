
@server_memberships.each do |sm|
  json.server_memberships do
    json.set! sm.id do
      json.partial! 'api/server_memberships/server_membership', sm: sm
    end
  end
  json.users do
    json.set! sm.user_id do
      json.partial! 'api/users/user', user: sm.user
    end
  end
end