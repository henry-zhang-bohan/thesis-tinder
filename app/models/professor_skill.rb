class ProfessorSkill < ApplicationRecord
	belongs_to :professor
	belongs_to :skill
end
