class Comment < ActiveRecord::Base
	validates :photo, :user, :date_time, :comment, :presence => true
	attr_accessible :date_time, :comment
	belongs_to :user
	belongs_to :photo
end
