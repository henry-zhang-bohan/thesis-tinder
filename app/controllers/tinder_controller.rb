class TinderController < ApplicationController
	def index
	end

	def professor_profile
		return render 'tinder/professor_profile'
	end

	def get_professor_info
		@professor = Professor.find(params[:id])
		render :json => { email: @professor.email, first_name: @professor.first_name, last_name: @professor.last_name }
	end

	def update_professor_info
		@professor = Professor.find(params[:id])
		if params[:email] != nil
			@professor.update_attribute(:email, params[:email])
		end

		render :json => { status: @status }
	end
end
