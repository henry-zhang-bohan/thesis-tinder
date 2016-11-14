class Skill < ApplicationRecord
	has_many :students, :through => :student_skills
	has_many :professors, :through => :professor_skills
end
