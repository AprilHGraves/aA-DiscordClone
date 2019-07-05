class Api::MessagesController < ApplicationController

  before_action :require_login


  def index
    class_type = params[:container_string].constantize
    container = class_type.find_by(id: params[:container_id])
    @messages = container.messages.includes(:user)
    render :index
  end

  def create
    @message = Message.new(message_params)
    @message.user_id = current_user.id
    if @message.save
      render :show
    else
      render json: @message.errors, status:422
    end
  end

  def update
    @message = Message.find_by(id: params[:id])
    if @message.update_attributes(message_params)
      render :show
    else
      render json: @message.errors, status:422 
    end
  end

  def destroy
    message = Message.find_by(id: params[:id])
    if message
      message.destroy
      render json: {messageId: params[:id]}
    end
  end


  private

  def message_params
    params.require(:message).permit(:body, :messagable_id, :messagable_type)
  end

end