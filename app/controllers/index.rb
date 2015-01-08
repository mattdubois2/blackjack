get '/' do
  erb :'index'
end

post '/players' do
  player = Player.find_or_create_by(name: params[:name])

  if player.save && request.xhr?
      content_type :json
      player.to_json
  else
    {errors: "invalid player information"}.to_json
  end
end
