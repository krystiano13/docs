class Invite < ApplicationRecord
    #after_create_commit { broadcast_invite }

    validates :document_id, presence: true
    validates :user_id, presence: true
    validates :role, presence: true
    validates :owner_id, presence: true

    belongs_to :document
    belongs_to :user

    #private
    #def broadcast_invite
        #ActionCable.server.broadcast("documents_channel", {
            #invite: {
               # id:,
               # document_id:,
               # user_id:,
               # role:
            #}
        #})
   # end
end