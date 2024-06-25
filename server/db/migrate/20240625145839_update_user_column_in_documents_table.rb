class UpdateUserColumnInDocumentsTable < ActiveRecord::Migration[7.1]
  def change
    rename_column :documents, :user, :username
  end
end
