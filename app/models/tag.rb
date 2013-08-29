class Tag < ActiveRecord::Base
	attr_accessible :left, :top, :width, :height, :user_id  
	validates :left, :top, :width, :height, :presence => true
	belongs_to :user
	belongs_to :photo
end
