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
        console.log(response)
        $('#player-info').text(playerInfoTemp(response))
        $('#current-bet').text("Bet")
        $('#current-bet-number').text(response.bet)
        App.deal("player")
        App.deal("dealer")
        App.deal("player")
        App.deal("dealer")
        $('.controls').removeClass('hidden')
      }
    });
  },

  deal: function(cardGetter) {
    var dealRequest = $.ajax({
      url: '/deal',
      method: 'get',
      dataType: 'json'
    });

    dealRequest.done(function(response){
      $("#"+cardGetter+"-cards").append(cardInfoTemp(response))
      var currentTotal = $("#"+cardGetter+"-total").text();
      if (currentTotal === ""){
        currentTotal = response.value;
      }
      else {
        currentTotal =  parseInt(currentTotal)
        currentTotal += response.value;
      }
      $("#"+cardGetter+"-total").text(currentTotal)
      return currentTotal
    })
  },

  hit: function(){
    App.deal("player");
  },

  stay: function(playerScore, dealerScore){
    if (dealerScore < 17){

      // var dealerScore = App.deal("dealer")
      App.deal('dealer')
      // console.log(dealerScore)
      // var dealerScore = $("#dealer-total").text();
      // dealerScore = parseInt(dealerScore)
      // console.log(dealerScore)
    }
    else {
      if (dealerScore === playerScore){
        console.log('push')
      }
      else if (playerScore > dealerScore){
        console.log('win')
        var winRequest = $.ajax({
          url: '/win',
          method: 'post',
          dataType: 'json',
          data: {bet: $('#current-bet-number').text()}
        })
        winRequest.done(function(response){
          $('#player-info').text(playerInfoTemp(response))
        })
        App.reset()
      }
      else {
        console.log('lose')
      }
    }

  },

  reset: function(){
    $('#player-bet-form').removeClass('hidden')
    $('.card').empty()
    $('.total').empty()
    $('#current-bet').empty()
    $('#current-bet-number').empty()
    // $('#current-bet').addClass('hidden')
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

  $('#hit').on('submit', function(e){
    e.preventDefault;
    App.hit();
  })

  $('#redeal').on('submit', function(e){
    e.preventDefault;
    App.reset();
  })

  $('#stay').on('submit', function(e){
    e.preventDefault;
    var playerScore = parseInt($("#player-total").text());
    var dealerScore = parseInt($("#dealer-total").text());
    App.stay(playerScore, dealerScore);
  })
});
