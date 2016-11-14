class CreateProfessorKeywords < ActiveRecord::Migration[5.0]
  def change
    create_table :professor_keywords do |t|
    	t.references :professor, index: true, foreign_key: true
    	t.references :keyword, index: true, foreign_key: true

      t.timestamps
    end
  end
end
