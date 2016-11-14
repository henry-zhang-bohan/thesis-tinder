class CreateStudentKeywords < ActiveRecord::Migration[5.0]
  def change
    create_table :student_keywords do |t|
    	t.references :student, index: true, foreign_key: true
    	t.references :keyword, index: true, foreign_key: true

      t.timestamps
    end
  end
end
