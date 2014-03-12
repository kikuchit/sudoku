class Question
  def initialize(table, initTable)
    @table = table
    @initTable = initTable
  end

  attr_reader :table, :initTable
end