class AddOwnerIdToInvitesTable < ActiveRecord::Migration[7.1]
  def change
    add_column :invites, :owner_id, :integer
  end
end
