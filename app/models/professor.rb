class Professor < ApplicationRecord
	mount_uploader :photo, PhotoUploader

	belongs_to :department

	has_many :professor_skills
	has_many :topics, :through => :professor_topics
	has_many :keywords, :through => :professor_keywords
end
