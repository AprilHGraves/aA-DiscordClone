class ServerMembership < ApplicationRecord

  validates :user_id, uniqueness: { scope: :server_id }

  belongs_to :server

  belongs_to :user

end
