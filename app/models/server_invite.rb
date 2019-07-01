class ServerInvite < ApplicationRecord

  attr_reader :duration

  before_validation :ensure_code
  validates :code, :uses, presence:true
  validates :code, uniqueness:true

  belongs_to :inviter,
    class_name: :User

  belongs_to :server

  def duration=(duration)
    self.expire_date = Time.now + (duration.to_i).hours
  end

  def self.generate_code
    chars = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    code = ''
    6.times { code << chars[rand(chars.length)] }
    if ServerInvite.find_by(code: code)
      return ServerInvite.generate_code
    else
      return code
    end
  end

  def ensure_code
    self.code ||= ServerInvite.generate_code
  end
  
end
