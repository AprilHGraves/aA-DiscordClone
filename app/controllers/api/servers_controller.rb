class Api::ServersController < ApplicationController

  before_action :require_login

  def index
    @servers = current_user.servers.includes(:channels)
    render :index
  end

  def create
    @server = Server.new(server_params)
    @server.owner_id = current_user.id
    if @server.save
      render :show
    else
      render json: @server.errors, status:422
    end
  end

  def update
    @server = Server.find_by(id: params[:id])
    if @server && @server.owner_id == current_user.id
      if @server.update_attributes(server_params)
        render :show
      else
        render json: @server.errors, status:422 
      end
    end
  end

  def destroy
    server = Server.find_by(id: params[:id])
    if server && server.owner_id == current_user.id
      server.destroy
      render json: {serverId: params[:id]}
    end
  end

  private

  def server_params
    params.require(:server).permit(:name, :photo)
  end
end