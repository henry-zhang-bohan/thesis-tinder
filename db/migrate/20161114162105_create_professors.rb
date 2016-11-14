class CreateProfessors < ActiveRecord::Migration[5.0]
  def change
    create_table :professors do |t|
    	t.string :email
    	t.string :first_name
    	t.string :last_name
    	t.string :link
    	t.string :photo

    	t.text :courses
    	t.text :likes
    	t.text :hides
    	t.text :bio

    	t.references :department, index: true, foreign_key: true

      t.timestamps
    end
  end
end
