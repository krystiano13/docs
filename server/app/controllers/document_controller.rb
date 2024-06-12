class DocumentController < ApplicationController
    def index
        @documents = Document.where(user_id: params[:user_id])

        return render json: {
            documents: @documents
        }, status: :ok
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
        @document = Document.where(id: params[:id])

        if @document.present?
            begin
                @document.update!(document_params)

                return render json: {
                    message: "Document updated successfully",
                    document: @document
                }, status: :ok
            rescue
                return render json: {
                    :errors => @document.errors
                }, status: :unprocessable_entity
            end
        else
            return render json: {
                :errors => ["Document not found"]
            }, status: 404
        end
    end

    def destroy
    end

    private 
    def document_params
       params.require(:document).permit(:name, :user_id, :content)
    end
end
