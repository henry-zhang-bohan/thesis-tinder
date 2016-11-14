class CreateStudentSkills < ActiveRecord::Migration[5.0]
  def change
    create_table :student_skills do |t|
    	t.references :student, index: true, foreign_key: true
    	t.references :skill, index: true, foreign_key: true

      t.timestamps
    end
  end
end
