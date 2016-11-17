class Student < ApplicationRecord
	mount_uploader :photo, PhotoUploader

	belongs_to :department

	has_many :student_skills
	has_many :student_topics
	has_many :student_keywords
end
