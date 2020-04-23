var colors = ["blue", "red", "green", "yellow"];

var flag = 1,
  level = 0,
  count = 0;

var game = "notEnded";

var color, userColor;

var gamePattern = [];

var userPattern = [];

$(".startButton").click(function() {
  if (flag == 1) {
    game="notEnded"
    $("body").removeClass("game-over");
    flag = 0;
    nextSequence();
  }
})

$(".btn").click(function(event) {
  // console.log(game)
  if (game != "ended" && flag==0) {
    userColor = event.target.id;
    animatePress(userColor);
    // $("."+userColor).fadeOut(100).fadeIn(100);
    playSound(userColor);
    // setTimeout(function(){
    //   nextSequence();
    // },1000);

    userPattern.push(userColor);
    // console.log(userPattern);

    var ans = checkAnswer(count);
    // console.log(ans);
    // console.log(count);
    if (ans == "success") {
      game = "ended";
      count = 0;
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userPattern = [];
    }
    else if (ans == "failure") {
      playSound("wrong")
      $("body").addClass("game-over");
      $("h1").text("Wrong button! Press start button.");
      flag = 1;
      level = 0;
      count=0;
      userPattern = [];
      gamePattern = [];
      game = "ended";
    }
    else {
      count++;
    }
  }

})

function checkAnswer(count) {

  if (userPattern[count] == gamePattern[count]) {
    if (count == level - 1) {
      return ("success");
    } else {
      return ("nothing");
    }
  } else {
    return ("failure")
  }
}

function nextSequence() {
  level++;
  game = "notEnded";
  $("h1").text("Level " + level +": Follow the sequence.")

  color = colors[randomize()];
  // console.log(color)

  $("." + color).fadeOut(100).fadeIn(100);
  playSound(color);


  gamePattern.push(color);
  // console.log(gamePattern);
}

function playSound(input) {
  var audio = new Audio('sounds/' + input + '.mp3');
  audio.play();
}

function animatePress(buttonPressed) {
  $("." + buttonPressed).addClass("pressed");
  setTimeout(function() {
    $("." + buttonPressed).removeClass("pressed");
  }, 100);
}

function randomize() {
  return (Math.floor(Math.random() * 4));
}
