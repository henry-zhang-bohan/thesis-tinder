class Topic < ApplicationRecord
	has_many :keywords, :through => :topic_keywords
	has_many :professors, :through => :professor_topics
	has_many :students, :through => :student_topics
end
