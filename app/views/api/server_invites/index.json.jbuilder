

@invites.each do |invite|
  json.invites do 
    json.set! invite.id do
      json.partial! 'api/server_invites/invite', invite: invite
    end
  end
  json.users do
    json.set! invite.inviter_id do
      json.partial! 'api/users/user', user: invite.inviter
    end
  end
end