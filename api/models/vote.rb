require 'date'

class Vote < ActiveRecord::Base
  validates :voter_ip, format: { with: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/ }, presence: true
  validates :choice_id, presence: true

  def self.count_per_candidate
    pluck(:choice_id).reduce({}) do |acc, choice_id|
      acc[choice_id] = where(choice_id: choice_id).count
      acc
    end
  end

  def self.count_per_hour
    query = <<-SQL
      SELECT
        COUNT(choice_id) as count,
        choice_id,
        strftime('%Y-%m-%d', created_at) as date,
        strftime('%H', created_at) as hour
      FROM votes
      GROUP BY choice_id, date, hour
    SQL

    result = ActiveRecord::Base.connection.execute(query)

    return result
  end
end
