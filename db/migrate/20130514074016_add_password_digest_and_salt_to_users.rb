class AddPasswordDigestAndSaltToUsers < ActiveRecord::Migration
	def change
		add_column :users, :password_digest, :string
		add_column :users, :salt, :string

		User.reset_column_information
		User.all.each do |u|
			u.password = '000000' # set 000000 as default password of existing accounts
			u.save(:validate => false)
		end
	end
end
