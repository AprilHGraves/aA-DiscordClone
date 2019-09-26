class Api::DmMembershipsController < ApplicationController

  before_action :require_login

  def create
    @dm_membership = DmMembership.new(membership_params)
    if @dm_membership.save
      render json: @dm_membership
    else
      render json: @dm_membership.errors, status:422
    end
  end

  def membership_params
    params.require(:membership).permit(:user_id, :dm_id)
  end

end