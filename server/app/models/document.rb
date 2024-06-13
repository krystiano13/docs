class Document < ApplicationRecord
    after_create_commit { broadcast_document }

    validates :name, presence: true
    validates :user_id, presence: true

    belongs_to :user

    has_many :invite

    private
    def broadcast_document
        ActionCable.server.broadcast("documents_channel", {
            document: {
                id:,
                content:,
                user_id:,
            }
        });
    end
end
