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

    def create
        @document = Document.new(document_params)

        begin
            @document.save!
            return render json: {
                message: "Document created successfully",
                document: @document
            }, status: :ok
        rescue
            return render json: {
                :errors => @document.errors
            }, status: :unprocessable_entity
        end
    end

    def update
    end

    def destroy
    end

    private 
    def document_params
       params.permit(:name, :user_id, :content)
    end
end
