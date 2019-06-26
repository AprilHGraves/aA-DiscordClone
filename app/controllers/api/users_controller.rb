class Api::UsersController < ApplicationController

  def show
    @user = User.find_by(id: params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors, status:422
    end
  end

  def update
    if current_user && params[:id].to_i == current_user.id
      @user = current_user
      if @user.update_attributes(user_params)
        render :show 
      else
        render json: @user.errors.full_messages, status:422 
      end
    end
  end

  def destroy
    if current_user && params[:id].to_i == current_user.id
      @user = current_user
      current_user.destroy
      session[:session_token] = nil
      render :show
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end