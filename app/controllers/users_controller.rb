class UsersController < ApplicationController
	def index
		@users = User.all
		@user_id = session[:user_id]
	end

	def login
	end

	def post_login
		if params[:login_name].nil?
			render :login
			return
		end
		user = User.find_by_login(params[:login_name].downcase)
		if user then
			if user.password_valid?(params[:pwd]) then
				reset_session
				session[:user_id] = user.id
				flash.now[:notice] = "Login Successfully!"
				redirect_to :controller => 'photos', :action => 'index', :id => user.id
			else
				flash.now[:error] = "Sorry. The password doesn't match."
				render :login
			end
		else
			flash.now[:error] = "Sorry. The login name doesn't exist."
			render :login
		end
	end

	def logout
		reset_session
		flash[:notice] = "You have successfully logged out."
		redirect_to :action => 'login'
	end

	def new
	end

	def create
		if params[:user].nil?
			render :new
		else 
			user = User.find_by_login(params[:user][:login_name])
			new_account = User.new(:first_name => params[:user][:first_name], :last_name => params[:user][:last_name], :login => params[:user][:login_name])
			new_account.password=(params[:user][:password]) 
			if new_account.valid?
				new_account.save
				flash.now[:notice] = "Create Account Successfully!"
				render :login
			else
				flash.now[:error] = "login name \"#{params[:user][:login_name]}\" exists."
				render :new
			end
		end
	end
end
