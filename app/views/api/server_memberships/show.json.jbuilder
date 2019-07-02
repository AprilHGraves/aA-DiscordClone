json.server_membership do 
  json.partial! 'api/server_memberships/server_membership', sm: @sm
end

json.server do
  json.partial! 'api/servers/server', server: @sm.server
end