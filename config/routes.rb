Rails.application.routes.draw do
	get '/' => 'tinder#index'
	get '/professor' => 'tinder#professor_profile'
	get '/get_professor_info' => 'tinder#get_professor_info'
	get '/update_professor_info' => 'tinder#update_professor_info'
end
