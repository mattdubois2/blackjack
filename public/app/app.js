var playerInfoTemp = _.template("Name: <%= name %> --- Bankroll: $<%= bankroll %>");

var cardInfoTemp = _.template("<p><%= name %> <%= suit %></p>");

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
        $('#player-info').text(playerInfoTemp(response))
        $('#player-setup-form').addClass('hidden')
        $('#player-bet-form').removeClass('hidden')
      }
    })

  },

  bet: function() {
    var betRequest = $.ajax({
      url: '/bet',
      method: 'post',
      dataType: 'json',
      data: $('#player-bet-form').serialize(),
    });

    betRequest.done(function(response){
      if (response.errors !== undefined){
        $('.errors').prepend("<p>" + response.errors + "</p>")
      }
      else {
        $('#player-bet-form').addClass('hidden')
        $('#player-info').text(playerInfoTemp(response))
        $('#current-bet').text("Betting $"+ response.bet)
        App.deal()
      }
    });
  },

  deal: function() {
    var dealRequest = $.ajax({
      url: '/deal',
      method: 'get',
      dataType: 'json'
    });

    dealRequest.done(function(response){
      console.log(response)
    })
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
    App.bet();
  })
});
