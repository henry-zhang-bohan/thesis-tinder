class UserMailer < ApplicationMailer
	default from: 'Teza <vobii.robot@gmail.com>'

	def match(student, professor, to=nil)
		@student = student
		@professor = professor
		return mail(to: to ? to :[student.email, professor.email].join(','),
			subject: 'It\'s a Match!')
	end
end
