Rails.application.routes.draw do
	get '/' => 'tinder#index'
	
	get '/professor' => 'tinder#professor_profile'
	get '/get_professor_info' => 'tinder#get_professor_info'
	post '/update_professor_info' => 'tinder#update_professor_info'

	get '/autocomplete_department' => 'tinder#autocomplete_department'
	get '/autocomplete_skill' => 'tinder#autocomplete_skill'

	get '/check_skill' => 'tinder#check_skill'
end
