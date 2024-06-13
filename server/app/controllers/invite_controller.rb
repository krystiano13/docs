class InviteController < ApplicationController
    def index
        @invites = Invite.where(user_id: params[:user_id])

        if @invites.present?
            return render json: {
                :invites => @invites
            }, status: :ok
        else
            return render json: {
                :errors => Array.new("Invites not found")
            }, status: 404
        end
    end
    
    def create
    end

    def update
    end

    def destroy
    end
end
