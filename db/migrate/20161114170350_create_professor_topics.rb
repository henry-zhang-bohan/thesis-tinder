class CreateProfessorTopics < ActiveRecord::Migration[5.0]
  def change
    create_table :professor_topics do |t|
    	t.references :professor, index: true, foreign_key: true
    	t.references :topic, index: true, foreign_key: true

      t.timestamps
    end
  end
end
