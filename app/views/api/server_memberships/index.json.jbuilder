
@server_memberships.each do |sm|
  json.set! sm.id do
    json.partial! 'api/server_memberships/server_membership', sm: sm
  end
end