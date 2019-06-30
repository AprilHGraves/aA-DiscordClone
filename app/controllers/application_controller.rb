class ApplicationController < ActionController::Base

  helper_method :current_user

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login(user)
    @current_user = user
    user.reset_session_token!
    session[:session_token] = user.session_token
  end

  def not_found
    redirect_to root
  end

  def require_login
    redirect_to root unless current_user
  end

  def invite_valid?(invite)
    if (invite.max_uses && invite.uses >= invite.max_uses) || (invite.expire_date && Time.now > invite.expire_date)
      invite.destroy
      return false
    end
    true
  end
end
