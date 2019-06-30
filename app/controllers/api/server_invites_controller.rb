class Api::ServerInvitesController < ApplicationController

  before_action :require_login

  def index
    @invites = Server.find_by(id: params[:server_id]).invites
    render :index
  end

  def show
    if params[:id] == "link"
      server_invite = ServerInvite.find_by(code: params[:link])
      if server_invite && invite_valid?(server_invite)
        @server = server_invite.server
        render 'api/servers/show'
      else
        render json: {inviteLink: "(The instant invite is invalid or has expired.)"}, status:404
      end
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

  def patch
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