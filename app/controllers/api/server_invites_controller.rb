class Api::ServerInvitesController < ApplicationController

  before_action :require_login

  def index
    @invites = Server.find_by(id: params[:serverId]).invites
    render :index
  end

  def show
    if params[:id] == "code"
      @invite = ServerInvite.find_by(code: params[:code])
      if @invite && invite_valid?(@invite)
        render :show
      else
        render json: {inviteLink: "(The instant invite is invalid or has expired.)"}, status:404
      end
    elsif params[:id] == "channel"
      @invite = current_user.invites.find_by(channel_id: params[:channelId])
      if !@invite || !invite_valid?(@invite)
        @invite = ServerInvite.new(duration: 24, server_id: params[:channelId], uses: 0, channel_id: params[:channelId])
        # delete server_id db column later and grab server via association through channel
        @invite.inviter_id = current_user.id
        @invite.save
      end
      render :show        
    else
      @invite = ServerInvite.find_by(id: params[:id])
      render :show
    end
    
  end

  def create
    @invite = ServerInvite.new(server_invite_params)
    @invite.inviter_id = current_user.id
    @invite.uses = 0
    if @invite.save
      render :show
    else
      render json: @invite.errors, status:422
    end
  end

  def update
    @invite = ServerInvite.find_by(id: params[:id])
    if @invite
      @invite.update_attributes(uses: 1 + @invite.uses)
      invite_valid?(@invite)
      render :show
    else
      render json: {inviteLink: "(The instant invite is invalid or has expired.)"}, status:404
    end
  end

  def destroy
    invite = ServerInvite.find_by(id: params[:id])
    if invite
      invite.destroy
      render json: {id: invite.id}
    end
  end

  def server_invite_params
    params.require(:invite).permit(:max_uses, :duration, :server_id, :channel_id)
  end

end