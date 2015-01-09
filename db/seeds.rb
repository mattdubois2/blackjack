
suits = %w(hearts spades diamonds clubs)
names = %w(2 3 4 5 6 7 8 9 10 J Q K A)
values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]

suits.each do |suit|
  names.each_with_index do |name, i|
    Card.create!(suit: suit, name: name, value: values[i], played: false)
  end
end
