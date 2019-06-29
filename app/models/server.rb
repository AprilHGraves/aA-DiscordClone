class Server < ApplicationRecord

  validates :name, presence:true

  has_one_attached :photo
  
  belongs_to :owner,
    primary_key: :id,
    foreign_key: :owner_id,
    class_name: :User

  has_many :server_memberships,
    dependent: :destroy,
    class_name: :ServerMembership

  has_many :members,
    through: :server_memberships,
    source: :user

  has_many :invites,
    class_name: :ServerInvite,
    dependent: :destroy

end
