class CreateDmConversations < ActiveRecord::Migration[5.2]
  def change
    create_table :dm_conversations do |t|
      
      t.timestamps
    end
  end
end
