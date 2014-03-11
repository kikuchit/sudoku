require 'sinatra/base'
require 'json'

class Sudoku < Sinatra::Base
  post '/solve' do
    request.body.rewind
    table = JSON.parse request.body.read
    "#{table}"
  end
end
