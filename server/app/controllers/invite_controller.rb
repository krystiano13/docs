class InviteController < ApplicationController
    def index
        @invites = Invite.where(user_id: params[:user_id])

        new_arr = Array.new

        @invites.each do |invite|
            new_arr.unshift({
                :id => invite.id,
                :created_at => invite.created_at,
                :updated_at => invite.updated_at,
                :accepted => invite.accepted,
                :owner_id => invite.owner_id,
                :user_id => invite.user_id,
                :document_id => invite.document_id,
                :role => invite.role,
                :owner_name => User.find_by(id: invite.owner_id).email
            })
        end
        
        if @invites.present?
            return render json: {
                :invites => new_arr,
            }, status: :ok
        else
            return render json: {
                :invites => []
            }, status: 404
        end
    end

    def get_by_doc
        @invites = Invite.where(document_id: params[:document_id])
        @usernames = []

        if @invites.present?
            begin
                @invites.each do |invite|
                    user = User.find_by(id: invite.user_id)
                    @usernames.unshift({ id: invite.id, email: user.email })
                end
    
                return render json: {
                    :invites => @invites,
                    :usernames => @usernames
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
        @user = User.find_by(email: params[:email]);
        @invite = Invite.new(invite_params)

        @invite.user_id = @user.id
        @invite.owner_id = params[:owner_id]

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
        params.permit(:document_id, :role, :user_id)
    end
end
