class Player < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates_length_of :name, minimum: 3
  after_initialize :default_bankroll

  def default_bankroll
    self.bankroll = 200
  end

end
