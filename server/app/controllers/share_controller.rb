class ShareController < ApplicationController
    def index
        @shares = Share.where(user_id: params[:user_id])
        @documents = Array.new

        if @shares.present?
            @shares.each do |item|
                @documents.push(item.document)
            end

            return render json: {
                :documents => @documents,
            }, status: :ok
        else
            return render json: {
                :documents => []
            }, status: 404
        end
    end
end
