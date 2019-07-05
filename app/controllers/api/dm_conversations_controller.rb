class Api::DmConversationsController < ApplicationController

  before_action :require_login

  def index
    @dm_conversations = current_user.dm_conversations.includes(:users).includes(:messages)
    render :index
  end
  
  def create
    @dm_convo = DmConversation.new()
    render @dm_convo
  end

end