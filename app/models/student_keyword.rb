class StudentKeyword < ApplicationRecord
	belongs_to :student
	belongs_to :keyword
end
