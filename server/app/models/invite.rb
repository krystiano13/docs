class Invite < ApplicationRecord
    validates :document_id, presence: true
    validates :role, presence: true,
    validates :accepted, presence: true

    belongs_to :document
end
