class CreateServerInvites < ActiveRecord::Migration[5.2]
  def change
    create_table :server_invites do |t|
      t.string :code, null:false
      t.integer :uses, null:false
      t.integer :max_uses
      t.datetime :expire_date
      t.integer :server_id, null:false
      t.integer :inviter_id, null:false
      t.integer :channel_id, null:false
      t.timestamps
    end
    add_index :server_invites, :code, unique:true
    add_index :server_invites, :inviter_id
    add_index :server_invites, :server_id
    add_index :server_invites, :channel_id
  end  
end
