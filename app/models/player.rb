class Player < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  before_save :default_bankroll

  def default_bankroll
    self.bankroll = 200
  end

end
