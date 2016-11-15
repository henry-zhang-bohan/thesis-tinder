class Student < ApplicationRecord
	mount_uploader :photo, PhotoUploader

	belongs_to :department

	has_many :skills, :through => :student_skills
	has_many :topics, :through => :student_topics
	has_many :keywords, :through => :student_keywords
end
