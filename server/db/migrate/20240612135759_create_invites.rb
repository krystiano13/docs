class CreateInvites < ActiveRecord::Migration[7.1]
  def change
    create_table :invites do |t|
      t.integer :document_id
      t.boolean :accepted
      t.string :role

      t.timestamps
    end
  end
end
