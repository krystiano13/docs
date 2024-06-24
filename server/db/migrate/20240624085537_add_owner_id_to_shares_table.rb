class AddOwnerIdToSharesTable < ActiveRecord::Migration[7.1]
  def change
    add_column :shares , :owner_id, :integer
  end
end
