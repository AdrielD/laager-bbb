class CreateVotes < ActiveRecord::Migration[8.0]
  def change
    create_table :votes do |t|
      t.string :voter_ip, null: false
      t.string :choice_id, null: false
      t.timestamps null: false
    end

    add_index :votes, :choice_id
  end
end
