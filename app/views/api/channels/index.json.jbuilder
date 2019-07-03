@channels.each do |channel|
  json.set! channel.id do
    json.extract! channel, :id, :name, :topic, :server_id
  end
end