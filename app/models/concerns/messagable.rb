
module Messagable
  extend ActiveSupport::Concern

  included do
    has_many :messages, as: :messagable
  end

end

# TODO consider using messagable concern in the future