class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
        params[:user][:email],
        params[:user][:password]
    )

    if @user
        login(@user)
        render 'api/users/show'
    else
      pw_error = "This field is required" if params[:user][:password] == ""
      email_error = "This field is required" if params[:user][:email] == ""
      if pw_error && email_error
        render json: {email: email_error, password: pw_error}, status: 401
      elsif email_error
        render json: {email: email_error}, status: 401
      else
        render json: {password: "Password does not match"}, status: 401
      end
    end

  end

  def destroy
    if current_user
      current_user.reset_session_token!
      session[:session_token] = nil
      render json: {}
    else
      render json: ["No current user"], status: 404
    end

  end

end