var playerInfoTemp = _.template("<p id='player-info'>Name: <%= name %> --- Bankroll: $<%= bankroll %> </p>");

var App = {

  start: function() {

    },
  login: function() {
    $('#start-button').addClass('hidden')
    $('#player-setup-form').removeClass('hidden')
  },
  play: function() {
    $('#player-setup-form').addClass('hidden')
    // console.log($('#player-setup-form').serialize());
    var request = $.ajax({
      url: '/players',
      method: 'post',
      dataType: 'json',
      data: $('#player-setup-form').serialize()
    });

    request.done(function(response){
      // console.log(response)
      $('.summary').append(playerInfoTemp(response))
      $('#player-bet-form').removeClass('hidden')
    });

  }
}

$(document).ready(function() {

  App.start();

  $('#start-button').on('click', function(e){
    e.preventDefault();
    App.login();
  })

  $('#play-button').on('click', function(e){
    e.preventDefault();
    App.play();
  })
});
