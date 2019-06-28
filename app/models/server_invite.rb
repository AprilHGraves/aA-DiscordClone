class ServerInvite < ApplicationRecord

  validates :code, :uses, presence:true
  validates :code, uniqueness:true

  belongs_to :inviter,
    class_name: :User

  belongs_to :server
  
end
