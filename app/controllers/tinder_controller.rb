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
			department_list: Department.all.map { |department| department.name }
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

		redirect_back(fallback_location: "/professor")
	end

	def autocomplete_department
		render :json => Department.where("LOWER(name) LIKE '%#{params[:term]}%'").map { |department| { label: department.name, value: department.name } }
	end
end
