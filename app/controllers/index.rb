get '/' do
  erb :'index'
end

post '/players' do
  player = Player.find_or_create_by(name: params[:name])
  # player = Player.create(name: params[:name])
  session[:player_id] = player.id
  if player.save && request.xhr?
    content_type :json
    player.to_json
  else
    {errors: "invalid player information"}.to_json
  end
end

post '/win' do
  player = Player.find(session[:player_id])
  player.bankroll += (params[:bet].to_i)*2
  player.save
  player.to_json
end

post '/lose' do
  player = Player.find(session[:player_id])
  player.to_json
end

post '/bet' do
  player = Player.find(session[:player_id])
  Card.reset
  bet = params[:bet].to_i
  if bet == 0
    {errors: "must enter a number"}.to_json
  elsif bet > player.bankroll
    {errors: "not enough in bankroll for that bet"}.to_json
  else
    player.bankroll -= bet
    player.save
    player.attributes.merge({bet: bet}).to_json
  end
end

get '/deal' do
  card = Card.where(played: false).sample
  card.played = true
  card.save
  card.to_json
end

get '/session' do
  session.inspect
end
