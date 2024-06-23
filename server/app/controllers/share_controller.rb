class ShareController < ApplicationController
    def index
        @shares = Share.where(user_id: params[:user_id])

        if @shares.present?
            return render json: {
                :shares => @shares
            }, status: :ok
        else
            return render json: {
                :shares => []
            }, status: 404
        end
    end
end
