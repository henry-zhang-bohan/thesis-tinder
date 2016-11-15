class TinderController < ApplicationController
	def index
	end

	def professor_profile
		return render 'tinder/professor_profile'
	end

	def get_professor_info
		@professor = Professor.find(params[:id])
		render :json => { email: @professor.email ? @professor.email : "",
			first_name: @professor.first_name ? @professor.first_name : "",
			last_name: @professor.last_name ? @professor.last_name : "",
			link: @professor.link ? @professor.link : "",
			bio: @professor.bio ? @professor.bio : "" }
	end

	def update_professor_info
		@professor = Professor.find(params[:id])
		@professor.update_attribute(:email, params[:email])
		@professor.update_attribute(:first_name, params[:first_name])
		@professor.update_attribute(:last_name, params[:last_name])
		@professor.update_attribute(:link, params[:link])
		@professor.update_attribute(:bio, params[:bio])

		redirect_back(fallback_location: "/professor")
	end
end
