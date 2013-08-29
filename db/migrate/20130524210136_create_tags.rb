class CreateTags < ActiveRecord::Migration
	def change
		create_table :tags do |t|
			t.belongs_to :photo
			t.belongs_to :user
			t.integer :left
			t.integer :top
			t.integer :width
			t.integer :height

			t.timestamps
		end
	end
end
