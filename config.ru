$LOAD_PATH.unshift("#{File.dirname(__FILE__)}")

if ENV['RACK_ENV'] == 'development'
  require 'pry'
  require 'dotenv'
  Dotenv.load
end

Bundler.setup

require 'bez_e_ocr_app'

run BezEOcrApp
