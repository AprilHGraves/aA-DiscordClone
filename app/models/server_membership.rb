class ServerMembership < ApplicationRecord

  validates :user_id, uniqueness: { scope: :server_id }
  validates :nickname, length: {maximum: 33}

  belongs_to :server

  belongs_to :user

end
