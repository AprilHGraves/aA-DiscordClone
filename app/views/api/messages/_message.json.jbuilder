json.extract! message, :id, :user_id, :body, :messagable_id, :messagable_type

json.created_at (message.created_at.to_f * 1000)
json.updated_at (message.updated_at.to_f * 1000)