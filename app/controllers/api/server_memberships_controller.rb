class Api::ServerMembershipsController < ApplicationController

  before_action :require_login
 
  def index
    @server_memberships = ServerMembership.includes(:server).where("server_id = ?", params[:server_id])
    render :index
  end

  def create
    @sm = ServerMembership.new(server_id: params[:server_id])
    @sm.user_id = current_user.id
    if @sm.save
      render :show
    else
      render json: @sm.errors, status:422
    end
  end

  def update
    @sm = ServerMembership.find_by(id: params[:id])
    if @sm.update_attributes(nickname: params[:nickname])
      render :show
    else
      render json: @sm.errors, status:422
    end
  end

  def destroy
    sm = ServerMembership.find_by(id: params[:id])
    if sm
      sm.destroy
      render json: {userId: sm.user_id, serverId: sm.server_id}
    end
  end

end