


@dm_conversations.each do |conversation|

  json.dm_conversations do
    json.set! conversation.id do
      json.extract! conversation, :id
      conversation.users.each do |user|
        if user.id != current_user.id
          json.other_user_id user.id
        end
      end
    end
  end

  json.users do
    conversation.users.each do |user|
      if user.id != current_user.id
        json.set! user.id do
          json.partial! 'api/users/user', user: user
        end
      end
    end
  end

end