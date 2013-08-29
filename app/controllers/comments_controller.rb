class CommentsController < ApplicationController
	def new
		@current_photo = Photo.find(params[:id])
		@user_id = session[:user_id]
	end

	def create
		if session[:user_id].nil? then
			redirect_to "/users/index"
		else
			time = DateTime.now
			comment = Comment.new(:date_time => time, :comment => params[:new_comment])
			comment.user = User.find(session[:user_id])
			comment.photo = Photo.find(params[:id])
			if comment.valid?
				comment.save
				flash[:notice] = "Comment Successfully!"
				redirect_to "/photos/index/#{comment.photo.user.id}"
			else
				flash[:error] = "Comment cannot be empty."
				redirect_to :new
			end
		end
	end
end
