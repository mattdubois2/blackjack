get '/' do
  erb :'index'
end

post '/players' do
  player = Player.find_or_create_by(name: params[:name])
  if player
    if request.xhr?
      content_type :json
      player.to_json
    end
  else
    @errors = "invalid player information"
    erb :'index'
  end
end
