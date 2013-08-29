class User < ActiveRecord::Base
	validates :first_name, :last_name, :password_digest, :salt, :presence => true
	validates :login, :presence => true, :uniqueness => true
	attr_accessible :first_name, :last_name, :login, :password_digest, :salt
	has_many :photos
	has_many :comments
	has_many :tags

	def password
		self.password_digest
	end

	def password=(pwd)
		salt = Random.new.rand(1024)
		pwd_ext = pwd.to_s + salt.to_s
		pwd_db = (Digest::SHA1.hexdigest pwd_ext)
		self.password_digest = pwd_db
		self.salt = salt.to_s
		self.save
	end

	def password_valid?(pwd)
		pwd_calculated = (Digest::SHA1.hexdigest(pwd + self.salt.to_s))
		return (pwd_calculated == self.password)
	end

	def full_name
		self.first_name + " " + self.last_name
	end
end
