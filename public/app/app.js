var playerInfoTemp = _.template("<p id='player-info'>Name: <%= name %> --- Bankroll: $<%= bankroll %> </p>");

var App = {

  start: function() {

    },
  login: function() {
    $('#start-button').addClass('hidden')
    $('#player-setup-form').removeClass('hidden')
  },
  setup: function() {

    // console.log($('#player-setup-form').serialize());
    var setupRequest = $.ajax({
      url: '/players',
      method: 'post',
      dataType: 'json',
      data: $('#player-setup-form').serialize()
    });

    setupRequest.done(function(response){
      // console.log(response)
      if (response.errors !== undefined){
        $('.errors').prepend("<p>" + response.errors + "</p>")
      }
      else {
        $('.summary').append(playerInfoTemp(response))
        $('#player-setup-form').addClass('hidden')
        $('#player-bet-form').removeClass('hidden')
      }
    })

  },

  deal: function() {
    var dealRequest = $.ajax({
      url: '/deal',
      method: 'post',
      dataType: 'json',
      data: $('#player-bet-form').serialize(),
    });

    dealRequest.done(function(response){
      console.log("this");
      if (response.errors !== undefined){
        $('.errors').prepend("<p>" + response.errors + "</p>")
      }
      else {
        $('#player-bet-form').addClass('hidden')
        $('#player-info').text(playerInfoTemp(response))
        $('.play-area').append("<p>Betting $"+ response.bet +"</p>")
      }
    });
  }
}

$(document).ready(function() {

  App.start();

  $('#start-button').on('click', function(e){
    e.preventDefault();
    App.login();
  })

  $('#setup-button').on('click', function(e){
    e.preventDefault();
    App.setup();
  })

  $('#player-bet-form').on('submit', function(e){
    e.preventDefault();
    App.deal();
  })
});
