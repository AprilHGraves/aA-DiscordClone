class Message < ApplicationRecord

  validates :user_id, :body, presence: true
  
  belongs_to :user
  belongs_to :messagable, polymorphic: true
end
