class Invite < ApplicationRecord
    validates :document_id, presence: true
    validates :user_id, presence: true
    validates :role, presence: true

    belongs_to :document
    belongs_to :user
end
