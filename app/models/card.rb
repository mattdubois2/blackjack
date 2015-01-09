class Card < ActiveRecord::Base
  # before_save :default_played, on: :create

  # def default_played
  #   self.played = false
  # end
  def self.reset
    self.update_all(played: false)
  end
end
