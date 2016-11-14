class Department < ApplicationRecord
	has_many :students
	has_many :professors
end
