class CreateMatches < ActiveRecord::Migration[5.0]
  def change
    create_table :matches do |t|
    	t.references :student, index: true, foreign_key: true
    	t.references :professor, index: true, foreign_key: true

    	t.datetime :deleted_at
      t.timestamps
    end
  end
end
