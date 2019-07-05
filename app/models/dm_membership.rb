class DmMembership < ApplicationRecord
  
  belongs_to :user

  belongs_to :dm_conversation,
    foreign_key: :dm_id,
    class_name: :DmConversation
end
