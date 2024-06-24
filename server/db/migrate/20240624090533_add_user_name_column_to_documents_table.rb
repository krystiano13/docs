class AddUserNameColumnToDocumentsTable < ActiveRecord::Migration[7.1]
  def change
    add_column :documents, :user, :string
  end
end
