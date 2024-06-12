class RenameDocumentsTableColumn < ActiveRecord::Migration[7.1]
  def change
    rename_column :documents , :owner_id, :user_id
  end
end
