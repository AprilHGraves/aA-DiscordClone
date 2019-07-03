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
end