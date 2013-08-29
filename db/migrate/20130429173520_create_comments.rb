class CreateComments < ActiveRecord::Migration
	def change
		create_table :comments do |t|
			t.belongs_to :user
			t.belongs_to :photo
			t.datetime :date_time
			t.text :comment

			t.timestamps
		end
	end
end
