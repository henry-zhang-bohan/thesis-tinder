class TinderController < ApplicationController
	before_action :require_user, only: [ :autocomplete_department, :autocomplete_skill, :autocomplete_keyword ]
	before_action :require_professor, only: [ :professor_profile, :get_professor_info, :update_professor_info ]

	def index
	end

	def login
		return render 'tinder/login'
	end

	def login_form
		if params[:identity] == "Student"
			cookies.signed[:identity] = "student"
			if Student.find_by(email: params[:email]) != nil
				cookies.signed[:id] = Student.find_by(email: params[:email]).id
			else
				@student = Student.create(department: default_department, email: params[:email])
				cookies.signed[:id] = @student.id
			end
			# check profile completion
			return redirect_to '/student'
		elsif params[:identity] == "Professor"
			cookies.signed[:identity] = "professor"
			if Professor.find_by(email: params[:email]) != nil
				cookies.signed[:id] = Professor.find_by(email: params[:email]).id
			else
				@professor = Professor.create(department: default_department, email: params[:email])
				cookies.signed[:id] = @professor.id
			end
			# check profile completion
			return redirect_to '/professor'
		end
	end

	def professor_profile
		return render 'tinder/professor_profile'
	end

	def get_professor_info
		@professor = Professor.find(params[:id])
		render :json => {
			email: @professor.email ? @professor.email : "",
			first_name: @professor.first_name ? @professor.first_name : "",
			last_name: @professor.last_name ? @professor.last_name : "",
			link: @professor.link ? @professor.link : "",
			bio: @professor.bio ? @professor.bio : "",
			photo: @professor.photo_url ? @professor.photo_url : ActionController::Base.helpers.image_path('photo.png'),
			department: @professor.department ? @professor.department.name : "",
			department_list: Department.all.map { |department| department.name },
			skill: @professor.professor_skills.map { |professor_skill| professor_skill.skill.name },
			keyword: @professor.professor_keywords.map { |professor_keyword| professor_keyword.keyword.name }
		}
	end

	def update_professor_info
		@professor = Professor.find(params[:id])
		@professor.update_attribute(:email, params[:email])
		@professor.update_attribute(:first_name, params[:first_name])
		@professor.update_attribute(:last_name, params[:last_name])
		@professor.update_attribute(:link, params[:link])
		@professor.update_attribute(:bio, params[:bio])
		@professor.update_attribute(:photo, params[:photo])

		# department
		@department = Department.find_by(name: params[:department])
		if @department != nil
			@professor.update_attribute(:department, @department)
		else
			@department = Department.create(name: params[:department].strip)
			@professor.update_attribute(:department, @department)
		end

		# skills
		@professor.professor_skills.each do |professor_skill|
			professor_skill.destroy()
		end
		@skills = params[:skill].to_s.split(",")
		@skills.each do |skill|
			@skill = Skill.find_by(name: skill)
			if @skill != nil
				ProfessorSkill.create(professor: @professor, skill: @skill)
			else
				@skill = Skill.create(name: skill)
				ProfessorSkill.create(professor: @professor, skill: @skill)
			end
		end

		# keywords
		@professor.professor_keywords.each do |professor_keyword|
			professor_keyword.destroy()
		end
		@keywords = params[:keyword].to_s.split(",")
		@keywords.each do |keyword|
			@keyword = Keyword.find_by(name: keyword)
			if @keyword != nil
				ProfessorKeyword.create(professor: @professor, keyword: @keyword)
			else
				@keyword = Keyword.create(name: keyword)
				ProfessorKeyword.create(professor: @professor, keyword: @keyword)
			end
		end

		redirect_back(fallback_location: "/professor")
	end

	def student_profile
		return render 'tinder/student_profile'
	end

	def get_student_info
		@student = Student.find(params[:id])
		render :json => {
			email: @student.email ? @student.email : "",
			first_name: @student.first_name ? @student.first_name : "",
			last_name: @student.last_name ? @student.last_name : "",
			link: @student.link ? @student.link : "",
			bio: @student.bio ? @student.bio : "",
			photo: @student.photo_url ? @student.photo_url : ActionController::Base.helpers.image_path('photo.png'),
			department: @student.department ? @student.department.name : "",
			department_list: Department.all.map { |department| department.name },
			skill: @student.student_skills.map { |student_skill| student_skill.skill.name },
			keyword: @student.student_keywords.map { |student_keyword| student_keyword.keyword.name }
		}
	end

	def update_student_info
		@student = Student.find(params[:id])
		@student.update_attribute(:email, params[:email])
		@student.update_attribute(:first_name, params[:first_name])
		@student.update_attribute(:last_name, params[:last_name])
		@student.update_attribute(:link, params[:link])
		@student.update_attribute(:bio, params[:bio])
		@student.update_attribute(:photo, params[:photo])

		# department
		@department = Department.find_by(name: params[:department])
		if @department != nil
			@student.update_attribute(:department, @department)
		else
			@department = Department.create(name: params[:department].strip)
			@student.update_attribute(:department, @department)
		end

		# skills
		@student.student_skills.each do |student_skill|
			student_skill.destroy()
		end
		@skills = params[:skill].to_s.split(",")
		@skills.each do |skill|
			@skill = Skill.find_by(name: skill)
			if @skill != nil
				StudentSkill.create(student: @student, skill: @skill)
			else
				@skill = Skill.create(name: skill)
				StudentSkill.create(student: @student, skill: @skill)
			end
		end

		# keywords
		@student.student_keywords.each do |student_keyword|
			student_keyword.destroy()
		end
		@keywords = params[:keyword].to_s.split(",")
		@keywords.each do |keyword|
			@keyword = Keyword.find_by(name: keyword)
			if @keyword != nil
				StudentKeyword.create(student: @student, keyword: @keyword)
			else
				@keyword = Keyword.create(name: keyword)
				StudentKeyword.create(student: @student, keyword: @keyword)
			end
		end

		redirect_back(fallback_location: "/student")
	end

	def autocomplete_department
		render :json => Department.where("LOWER(name) LIKE '%#{params[:term]}%'").map { |department| { label: department.name, value: department.name } }
	end

	def autocomplete_skill
		render :json => Skill.where("LOWER(name) LIKE '%#{params[:term]}%'").map { |skill| { label: skill.name, value: skill.name } }
	end

	def autocomplete_keyword
		render :json => Keyword.where("LOWER(name) LIKE '%#{params[:term]}%'").map { |keyword| { label: keyword.name, value: keyword.name } }
	end

	def check_skill
		if Skill.find_by(name: params[:skill]) != nil
			@result = "yes"
		else
			@result = "no"
		end
		render :json => { :existing => @result }
	end

	def check_keyword
		if Keyword.find_by(name: params[:keyword]) != nil
			@result = "yes"
		else
			@result = "no"
		end
		render :json => { :existing => @result }
	end
end
