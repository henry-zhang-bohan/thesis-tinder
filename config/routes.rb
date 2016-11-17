Rails.application.routes.draw do
	get '/' => 'tinder#index'
	get '/login' => 'tinder#login'
	post '/login_form' => 'tinder#login_form'
	get '/logout' => 'tinder#logout'
	
	get '/professor' => 'tinder#professor_profile'
	get '/get_professor_info' => 'tinder#get_professor_info'
	get '/get_ranked_professor_info' => 'tinder#get_ranked_professor_info'
	post '/update_professor_info' => 'tinder#update_professor_info'

	get '/student' => 'tinder#student_profile'
	get '/get_student_info' => 'tinder#get_student_info'
	get '/get_ranked_student_info' => 'tinder#get_ranked_student_info'
	post '/update_student_info' => 'tinder#update_student_info'

	get '/autocomplete_department' => 'tinder#autocomplete_department'
	get '/autocomplete_skill' => 'tinder#autocomplete_skill'
	get '/autocomplete_keyword' => 'tinder#autocomplete_keyword'

	get '/check_skill' => 'tinder#check_skill'
	get '/check_keyword' => 'tinder#check_keyword'

	get '/like' => 'tinder#like'
	get '/dislike' => 'tinder#dislike'
end
