class Professor < ApplicationRecord
	mount_uploader :photo, PhotoUploader

	belongs_to :department

	has_many :professor_skills
	has_many :professor_topics
	has_many :professor_keywords
end
