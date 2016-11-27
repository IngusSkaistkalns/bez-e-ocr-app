source 'https://rubygems.org'

ruby '2.3'

gem 'sinatra'
gem 'sinatra-contrib'
gem 'slim'

gem 'foreman'

gem 'puma'

group :development do
  # Use this if you work with 3.04 version
  # gem 'tesseract-ocr', git: 'https://github.com/ortutay/ruby-tesseract-ocr.git', ref: '74a4042a'
  gem 'dotenv'
  gem 'pry'
end

group :production do
  # Use this if you work with 3.03, like it is on heroku for example
  gem 'tesseract-ocr'
end
