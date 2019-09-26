class Api::DmConversationsController < ApplicationController

  before_action :require_login

  def index
    @dm_conversations = current_user.dm_conversations.includes(:users)
    render :index
  end

  def show
    @dm_conversation = DmConversation.find_by(id: params[:id])
    render :show
  end
  
  def create
    @dm_conversation = DmConversation.new()
    if @dm_conversation.save
      render :show
    else
      render json: @dm_conversation.errors, status:422
    end
  end

end