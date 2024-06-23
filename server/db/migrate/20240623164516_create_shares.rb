class CreateShares < ActiveRecord::Migration[7.1]
  def change
    create_table :shares do |t|
      t.integer :user_id
      t.integer :document_id
      t.string :role

      t.timestamps
    end
  end
end
