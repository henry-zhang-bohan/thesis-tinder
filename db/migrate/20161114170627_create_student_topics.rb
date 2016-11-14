class CreateStudentTopics < ActiveRecord::Migration[5.0]
  def change
    create_table :student_topics do |t|
    	t.references :student, index: true, foreign_key: true
    	t.references :topic, index: true, foreign_key: true

      t.timestamps
    end
  end
end
