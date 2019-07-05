class CreateDmMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :dm_memberships do |t|
      t.integer :user_id, null:false
      t.integer :dm_id, null:false
      t.timestamps
    end
    add_index :dm_memberships, [:user_id, :dm_id], unique:true
    add_index :dm_memberships, [:dm_id]
  end
end
