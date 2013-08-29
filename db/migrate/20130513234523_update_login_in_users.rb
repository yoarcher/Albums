class UpdateLoginInUsers < ActiveRecord::Migration
	def up
		User.reset_column_information
		User.all.each do |u|
			u.login = u.last_name.downcase
			u.save(:validate => false)
		end
	end

	def down
		User.all.each do |u|
			u.login = ""
			u.save(:validate => false)
		end
	end
end