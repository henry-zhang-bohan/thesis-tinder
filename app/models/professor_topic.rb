class ProfessorTopic < ApplicationRecord
	belongs_to :professor
	belongs_to :topic
end
