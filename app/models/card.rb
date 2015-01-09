class Card < ActiveRecord::Base
  after_initialize :default_played

  def default_played
    self.played = 0
  end
end
