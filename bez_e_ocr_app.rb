require 'sinatra'
require "sinatra/json"
require 'slim'

require 'tesseract-ocr'

class BezEOcrApp < Sinatra::Base
  enable :sessions

  set :session_secret, SecureRandom.hex(32)

  get '/' do
    slim :index
  end

  post '/image' do
    content_type :json
    engine = Tesseract::Engine.new

    begin
      ocr_text = engine.text_for(params[:image][:tempfile].path)
      ocr_status_text = "Server side OCR completed!"
    rescue StandardError => e
      ocr_status_text = e.message
    end

    json(
      ocrText: ocr_text,
      ocrStatusText: ocr_status_text
    )
  end
end
