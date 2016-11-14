class CreateProfessorSkills < ActiveRecord::Migration[5.0]
  def change
    create_table :professor_skills do |t|
    	t.references :professor, index: true, foreign_key: true
    	t.references :skill, index: true, foreign_key: true

      t.timestamps
    end
  end
end
