class DocumentController < ApplicationController
    def index
        unless params[:user_id]
            return render json: { 
                error: "user_id is required" 
            }, status: :bad_request

        else
            @documents = Document.where(user_id: params[:user_id])

            return render json: {
                documents: @documents
            }, status: :ok
        end
    end
end
