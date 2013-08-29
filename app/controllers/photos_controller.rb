class PhotosController < ApplicationController
	def index
		begin
			@user = User.find(params[:id])
		rescue ActiveRecord::RecordNotFound 
			@user = nil
			return
		end
		@message = @user.first_name + " " + @user.last_name + "\'s Album"
		@photos = @user.photos
		@user_id = session[:user_id]
		@users = User.all
	end

	def new
		@user_id = session[:user_id]
		if @user_id.nil?
			render '/users/login'
		end
	end

	def create
		@user_id = session[:user_id]
		if params[:photo].nil?
			if @user_id.nil?
				render '/users/login'
			else 
				redirect_to "/photos/index/#{@user_id}"
			end
			return
		end
		time = DateTime.now
		to_upload = params[:photo][:file]
		path = File.join('public/images/', to_upload.original_filename)
		File.open(path, "wb") { |f| f.write(to_upload.read) }
		user_id = session[:user_id]
		photo = Photo.new(:date_time => time, :file_name => to_upload.original_filename)
		photo.user = User.find(user_id)
		if photo.valid?
			photo.save
			flash[:notice] = "Photo Uploaded Successfully!"
			redirect_to "/photos/index/#{photo.user.id}"
		else 
			flash[:error] = "Photo Upload Failed."
			redirect_to :new
		end

	end

	def tagger
		tag = Tag.new(:left => params['left'].to_i, :top => params['top'].to_i, 
			:width => params['width'].to_i, :height => params['height'].to_i)
		tag.user = User.find(params['tagUser'].to_i)
		tag.photo = Photo.find(params[:id].to_i)
		if tag.valid?
			tag.save
			redirect_to "/photos/index/#{tag.photo.user.id}##{tag.photo.file_name}"
		else 
			flash[:error] = "Tagging photo Failed."
			redirect_to :back
		end
		
	end
end