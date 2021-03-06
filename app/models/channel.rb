class Channel < ApplicationRecord

  include Messagable

  validates :name, presence:true
  validates :topic, length: {maximum:1025}

  belongs_to :server
  
end
