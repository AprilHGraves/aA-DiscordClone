@servers.each do |server|
  json.servers do
    json.set! server.id do
      json.partial! 'api/servers/server', server: server
    end
  end
  json.channels do
    server.channels.each do |channel|
      json.set! channel.id do
        json.extract! channel, :id, :name, :topic, :server_id
      end
    end
  end
  json.users do
    server.members.each do |user|
      json.set! user.id do
        json.partial! 'api/users/user', user: user
      end
    end
  end
  json.messages do
    server.messages.each do |message|
      json.set! message.id do
        json.partial! 'api/messages/message', message: message
      end
    end
  end
end