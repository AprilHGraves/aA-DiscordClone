class Api::ChannelsController < ApplicationController

  before_action :require_login


  def index
    @channels = Channel.where("server_id = ?", params[:server_id])
    render :index
  end

  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      render :show
    else
      render json: @channel.errors, status:422
    end
  end

  def update
    @channel = Channel.find_by(id: params[:id])
    if @channel.update_attributes(channel_params)
      render :show
    else
      render json: @channel.errors, status:422 
    end
  end

  def destroy
    channel = Channel.find_by(id: params[:id])
    if channel
      channel.destroy
      render json: {channelId: params[:id]}
    end
  end


  private

  def channel_params
    params.require(:channel).permit(:name, :topic, :server_id)
  end

end