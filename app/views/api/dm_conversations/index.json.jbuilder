
@dm_conversations.each do |conversation|

  convo_users = conversation.users
  convo_users.each do |user|
    if user.id != current_user.id
      other_user = user
    end
  end

  json.dm_conversations do
    json.set! conversation.id do
      json.extract! conversation, :id
      json.other_user_id other_user.id
    end
  end

  json.users do    
    json.set! other_user.id do
      json.partial! 'api/users/user', user: other_user
    end
  end

  json.messages do
    conversation.messages.each do |message|
      json.set! message.id do
        json.partial! 'api/messages/message', message: message
      end
    end
  end

end