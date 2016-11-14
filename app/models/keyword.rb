class Keyword < ApplicationRecord
	has_many :topics, :through => :topic_keywords
	has_many :professors, :through => :professor_keywords
	has_many :students, :through => :student_keywords
end
