class CreateTopicKeywords < ActiveRecord::Migration[5.0]
  def change
    create_table :topic_keywords do |t|
    	t.references :topic, index: true, foreign_key: true
    	t.references :keyword, index: true, foreign_key: true

      t.timestamps
    end
  end
end
