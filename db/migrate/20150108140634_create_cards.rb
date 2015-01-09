class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :suit
      t.string :name
      t.integer :value
      t.binary :played
      t.timestamps
    end
  end
end
