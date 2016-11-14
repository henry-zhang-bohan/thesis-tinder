class Professor < ApplicationRecord
	mount_uploader :photo, PhotoUploader

	belongs_to :department

	has_many :skills, :through => :professor_skills
	has_many :topics, :through => :professor_topics
	has_many :keywords, :through => :professor_keywords
end
