class Player < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates_length_of :name, minimum: 3
  before_save :default_bankroll, on: :create

  def default_bankroll
    self.bankroll = 200 unless self.bankroll
  end

end
