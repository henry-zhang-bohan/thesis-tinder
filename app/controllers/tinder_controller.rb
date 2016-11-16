class TinderController < ApplicationController
	def index
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
			skill: @professor.professor_skills.map { |professor_skill| professor_skill.skill.name }
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

		redirect_back(fallback_location: "/professor")
	end

	def autocomplete_department
		render :json => Department.where("LOWER(name) LIKE '%#{params[:term]}%'").map { |department| { label: department.name, value: department.name } }
	end

	def autocomplete_skill
		render :json => Skill.where("LOWER(name) LIKE '%#{params[:term]}%'").map { |skill| { label: skill.name, value: skill.name } }
	end

	def check_skill
		if Skill.find_by(name: params[:skill]) != nil
			@result = "yes"
		else
			@result = "no"
		end
		render :json => { :existing => @result }
	end
end
