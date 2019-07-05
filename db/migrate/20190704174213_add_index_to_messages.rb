class AddIndexToMessages < ActiveRecord::Migration[5.2]
  def change
    add_index :messages, [:messagable_type, :messagable_id]

  end
end
