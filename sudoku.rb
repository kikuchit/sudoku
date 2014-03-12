require 'sinatra/base'
require 'json'
require_relative 'lib/questiongenerator'
require_relative 'lib/question'

class Sudoku < Sinatra::Base
  get '/question' do
    q = QuestionGenerator.create
    ary = [q.table, q.initTable]
    JSON.generate(ary)
  end

  post '/solve' do
    request.body.rewind
    table = JSON.parse request.body.read
    (0..table.length-1).each do |x|
      (0..table[x].length-1).each do |y|
        if table[x][y].eql?(0)
          return "NG unanswered(x=#{x},y=#{y})"
        end

        unless check_width(table, x, y)
          return "NG width(x=#{x},y=#{y})"
        end

        unless check_height(table, x, y)
          return "NG height(x=#{x},y=#{y})"
        end

        unless check_box(table, x, y)
          return "NG box(x=#{x},y=#{y})"
        end
      end
    end

    'OK'
  end

  private
  def check_width(table, x, y)
    (y+1..table[x].length-1).each do |i|
      if table[x][y] == table[x][i]
        return false
      end
    end
    true
  end

  def check_height(table, x, y)
    (x+1..table.length-1).each do |i|
      if table[x][y] == table[i][y]
        return false
      end
    end
    true
  end

  def check_box(table, x, y)
    start_x = box_start_index(x)
    start_y = box_start_index(y)
    (y+1..start_y+2).each do |i|
      if table[x][y] == table[x][i]
        return false
      end
    end

    (x+1..start_x+2).each do |i|
      (start_y..start_y+2).each do |j|
        if table[x][y] == table[i][j]
          return false
        end
      end
    end
    true
  end

  def box_start_index(i)
    case i
    when 0..2 then 0
    when 3..5 then 3
    when 6..8 then 6
    end
  end
end
