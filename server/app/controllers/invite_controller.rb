class InviteController < ApplicationController
    def index
        @invites = Invite.where(user_id: params[:user_id])
        @user = User.find_by(id: params[:user_id])

        if @invites.present?
            return render json: {
                :invites => @invites,
                :user => @user
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
        @invite = Invite.where(id: params[:id])

        if @invite.present?
            begin
                @invite.update!(invite_params)
                return render json: {
                    :message => "Invite updated successfully",
                    :invite => @invite
                }, status: :ok
            rescue
                return render json: {
                    :errors => @invite.errors
                }, status: :unprocessable_entity
            end
        else
            return render json: {
                :errors => Array.new("Invite not found")
            }, status: 404
        end
    end

    def destroy
        @invite = Invite.find(params[:id])

        if @invite.present?
            @invite.destroy
            return render json: {
                :message => "Invite deleted successfully"
            }, status: :ok
        else
            return render json: {
                :errors => Array.new("Invite not found")
            }, status: 404
        end
    end

    private 
    def invite_params
        params.require(:invite).permit(:document_id, :user_id, :role)
    end
end
