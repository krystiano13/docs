class InviteController < ApplicationController
    def index
        @invites = Invite.where(user_id: params[:user_id])
        @user = User.find_by(id: params[:user_id])
        @document = Document.find_by(user_id: params[:user_id])

        if @invites.present?
            return render json: {
                :invites => @invites,
                :user => @user,
                :document => @document
            }, status: :ok
        else
            return render json: {
                :invites => []
            }, status: 404
        end
    end

    def get_by_doc
        @invites = Invite.where(document_id: params[:document_id])

        if @invites.present?
            begin
                @invites.each do |invite|
                    user = User.find_by(user_id: invite[:user_id])
                    invite[:username] = user[:email]
                end

                return render json: {
                    :invites => @invites
                }, status: :ok
            rescue
                return render json: {
                    :invites => []
                } 
            end
        else
            return render json: {
                :invites => []
            }
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

    def accept
        @invite = Invite.find_by(id: params[:id])
        
        if @invite.present?
            begin
                @document = Document.find_by(id: @invite.document_id)
                @share = Share.new
                @share.user_id = @invite.user_id
                @share.owner_id = @document.user_id
                @share.role = @invite.role
                @share.document_id = @invite.document_id

                @share.save!
                @invite.destroy

                return render json: {
                    :message => "Invite accepted successfully",
                    :share => @share
                }, status: :ok
            rescue
                return render json: {
                    :errors => Array.new("Invite could not be accepted")
                }, status: :unprocessable_entity
            end
        else
            return render json: {
                :errors => Array.new("Invite not found")
            }, status: 404
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
