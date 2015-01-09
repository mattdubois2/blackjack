get '/' do
  erb :'index'
end

post '/players' do
  player = Player.find_or_create_by(name: params[:name])
  session[:player_id] = player.id
  if player.save && request.xhr?
    content_type :json
    player.to_json
  else
    {errors: "invalid player information"}.to_json
  end
end

post '/deal' do
  player = Player.find(session[:player_id])
  bet = params[:bet].to_i

  if bet > player.bankroll
    {errors: "not enough in bankroll for that bet"}.to_json
  else
    player.bankroll -= bet
    player.save
    player.attributes.merge({bet: bet}).to_json
  end
end

get '/session' do
  session.inspect
end
