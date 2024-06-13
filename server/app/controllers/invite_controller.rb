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
        @invite = Invite.new(invite_params)

        begin
            @invite.save!
            return render json: {
                :message => "Invite created successfully",
                :invite => @invite
            }, status: :ok
        rescue
            return render json: {
                :errors => @invite.errors
            }, status: :unprocessable_entity
        end
    end

    def update
    end

    def destroy
    end

    private 
    def invite_params
        params.require(:invite).permit(:document_id, :user_id, :role)
    end
end
