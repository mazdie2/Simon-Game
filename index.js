var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


$(document).on('click', '.btn', function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);


  // if (userClickedPattern === gamePattern) {
  //   nextSequence();
  // } else {
  //   $("body").css("background-color", "red");
  //   var sound = new Audio ("sounds/wrong.mp3");
  //   sound.play();
  //   setTimeout(function () {$("body").css("background-color", "#011F3F");}, 100);
  //   $("#level-title").html("Game Over, Press Any Key to Restart");
  //   userClickedPattern.splice(0, userClickedPattern.length);
  //   gamePattern.splice(0, gamePattern.length)
  // }

});

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keydown(function() {
  if (started === false) {
    started = true;
    $("#level-title").html("Level 0");
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over, Press Any Key to Restart");
    startOver();
    //console.log("wrong");
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}









//return randomChosenColour;
// $("btn").click(function () {
//   alert("click");
// var userChosenColor = this.id;
// console.log(userChosenColor);
// });
// console.log(nextSequence());
