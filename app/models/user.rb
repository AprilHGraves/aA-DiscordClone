class User < ApplicationRecord
  attr_reader :password

  before_validation :ensure_session_token, :ensure_tag

  validates :username, :tag, :email, :session_token, presence:true
  validates :tag, :email, :session_token, uniqueness:true
  validates :password, length: {minimum:1, allow_nil:true, message: "can't be blank"}

  def self.find_by_credentials(email, pw)
    user = User.find_by(email: email)
    return user if user && user.is_password?(pw)
    nil
  end

  def password=(pw)
    @password = pw
    self.password_digest = BCrypt::Password.create(pw)
  end

  def change_password!(old_pw, new_pw)
    if new_pw.instance_of?(String) && new_pw.length > 0 
      if is_password?(old_pw)
        self.password_digest = BCrypt::Password.create(new_pw)
        self.save
        return true
      else
        errors.add(:old_password, "Password does not match")
      end
    else
      errors.add(:new_password, "This is invalid")
    end
    nil
  end

  def is_password?(pw)
    BCrypt::Password.new(self.password_digest).is_password?(pw)
  end

  def self.generate_session_token
    token = SecureRandom.urlsafe_base64
    while User.find_by(session_token: token)
      token = SecureRandom.urlsafe_base64
    end
    token
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save
  end

  def ensure_tag
    tag_num = rand(1000..9999)
    tag = "#{self.username}##{tag_num}"
    while User.find_by(tag: tag)
      tag_num = rand(1000..9999)
      tag = "#{self.username}##{tag_num}"
    end
    self.tag = tag
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

end
