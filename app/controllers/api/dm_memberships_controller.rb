class Api::DmMembershipsController < ApplicationController

  before_action :require_login

  def create
    @dm_membership = DmMembership.new(user_id: params[:user_id], dm_id: params[:dm_id])
    if @dm_membership.save
      render @dm_membership
    else
      render json: @dm_membership.errors, status:422
    end
  end

end