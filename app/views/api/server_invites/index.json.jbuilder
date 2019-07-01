@invites.each do |invite|
  json.set! invite.id do
    json.partial! 'api/server_invites/invite', invite: invite
  end
end