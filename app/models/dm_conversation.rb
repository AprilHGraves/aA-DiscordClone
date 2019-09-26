class DmConversation < ApplicationRecord
  
  include Messagable

  has_many :dm_memberships,
    foreign_key: :dm_id,
    class_name: :DmMembership

  has_many :users,
    through: :dm_memberships,
    source: :user
    
end
