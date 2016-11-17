class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_student, :current_professor, :require_student, :require_professor, :require_user

  def current_student
  	return Student.find_by(id: cookies.signed[:id]) if cookies.signed[:identity] == "student"
  end

  def current_professor
  	return Professor.find_by(id: cookies.signed[:id]) if cookies.signed[:identity] == "professor"
  end

  def require_student
  	return redirect_to '/login' unless current_student
  end

  def require_professor
  	return redirect_to '/login' unless current_professor
  end

  def require_user
  	return redirect_to '/login' unless (current_student || current_professor)
  end

  def default_department
    return Department.first ? Department.first : Department.create(name: "Engineering")
  end
end
