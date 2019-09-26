
json.dm_conversation do
  json.extract! @dm_conversation, :id
  @dm_conversation.users.each do |user|
    if user.id != current_user.id
      json.other_user_id other_user.id
    end
  end
end

json.messages do
  @dm_conversation.messages.each do |message|
    json.set! message.id do
      json.partial! 'api/messages/message', message: message
    end
  end
end