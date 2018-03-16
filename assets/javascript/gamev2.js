// GLOBALS
//=======================================================

var displayFruit
var targetNum;
var currentScore;
var wins;
var losses;
var gameStatus;
var playAnother;
var continuing = false;


// FUNCTIONS
//=======================================================

function displayCurrentScore() {
  $(".currentScoreArea").text(currentScore);
}

function displayStatus() {
  if (gameStatus === "start") {
    // console.log("Displaying initial gameStatus");
    $("#status").text("Let's play!!");
  }
  else if (gameStatus === "win") {
    // console.log("Displaying win gameStatus");
    $("#status").text("You won!!");
  }
  else if (gameStatus === "lose") {
    // console.log("Displaying lose gameStatus");
    $("#status").text("You lost!!");
  }
  else {
    // console.log("Shouldn't get here in displayStatus");
  }
}

function displayLosses() {
  // console.log("starting displayLosses");
  $("#losses").text(losses);
}

function displayTargetNum() {
  $(".targetNumArea").text(targetNum);
}

function displayWins() {
  // console.log("starting displayWins");
  $("#wins").text(wins);
}

function getRandomNum(range) {
  // returns random value between a minimum and maximum value
  var minVal = range[0];
  var maxVal = (range[1] + 1) - minVal;
  // returns value between 0 and maxVal - 1
  var randomVal = Math.floor(Math.random() * maxVal);
  // ensures value returned is within range specified.
  return randomVal + minVal;
}

function initializeDisplay() {
  // Sets/resets display for start of each round of play 
  displayTargetNum();
  displayCurrentScore();
  displayWins();
  displayLosses();
  displayStatus('start');
}

function initalizeGlobals() {
  // initializes values for newly started game
  // console.log("in initializeGlobals")
  targetNum = setTargetNum();
  displayFruit = $(".fruit");
  currentScore = 0;
  playAnother = false;
  if (!continuing) {
    fruitClasses = setUpFruit();
    wins = 0;
    losses = 0;
    gameStatus = "start";
  }
  else {
    reInitializeFruit();
  }
}

// function logVals() {
//   // logskey values
//   console.log("targetNum: " + targetNum +
//               " currentScore: " + currentScore +
//               " appleNum: " + appleNum +
//               " lemonNum: " + lemonNum +
//               " pearNum: " + pearNum + 
//               " orangeNum: " + orangeNum );
// }

function main() {
  // console.log("in main")
  setUpGame();
  play();
  // console.log('finished play and still running');
}

function play() {
  // play the game until the window is closed
  displayFruit.on("click", ".fruitImage", function() {
    // console.log('starting play loop');
    var fruitValue = ($(this).attr("data-fruitvalue"));
    fruitValue = parseInt(fruitValue);
    // console.log("This fruit's value is: " + fruitValue);
    currentScore += fruitValue;
    displayCurrentScore();
    winLoseOrGoOn();
    continuing = true;
    if (playAnother) {
      // console.log("starting a new game");
      setUpGame();
    }
    // console.log('at end of play\'s loop');
  }); // close of on-click function
}

function playSound(outcome) {
  // plays sound at end of a round of the game
  // sound effect license is Creative Commons License: Attribution 3.0 recorded by Mike Koenig, 
  // downloaded from http://soundbible.com/1003-Ta-Da.html and http://soundbible.com/831-Groan.html
  // console.log("In playSound");
  var sound;
  var endGameSound = $("#audioplayer");
  if (outcome === 'win') {
    sound = 'assets/audio/Ta_Da-SoundBible.com-1884170640.mp3'
    endGameSound.attr("src", sound);
  }
  else if (outcome === 'lose') {
    sound = "assets/audio/Groan-SoundBible.com-1306380507.mp3";
    endGameSound.attr("src", sound);
  }
  else {
    // console.log('playSound received unexpected message');
  }
}

function reInitializeFruit() {
  // console.log('reinitializing fruit nums');
  $(".fruitImage").each(function (index, value) {
    ($(this).attr("data-fruitvalue", getRandomNum([1, 12])));
  });
}

function setFruitNums() {
  // initializes fruit values to random num between 1 - 12
  var range = [1, 12];
  appleNum = getRandomNum(range);
  lemonNum = getRandomNum(range);
  pearNum = getRandomNum(range);
  orangeNum = getRandomNum(range);
  return [appleNum, lemonNum, pearNum, orangeNum]; 
}

function setTargetNum() {
  var range = [19, 120];
  return getRandomNum(range);
}

function setUpFruit() {
  // values for HTML src attribute
  var fruitSrcs = ["assets/images/apple.png",
                   "assets/images/lemon.png",
                   "assets/images/pear.png",
                   "assets/images/orange.png" ];
  // data for each fruit's secret number
  var fruitNums = setFruitNums();
  // HTML class attributes
  var fruitClasses = [".apple", ".lemon", ".pear", ".orange"];

  for (var i = 0; i < fruitClasses.length; i++) {
    var fruitForGame = $("<img>");
    fruitForGame.addClass("fruitImage");
    fruitForGame.attr("src", fruitSrcs[i]);
    fruitForGame.attr("width", "90px");
    fruitForGame.attr("height", "auto");
    fruitForGame.attr("data-fruitvalue", fruitNums[i]);
    var fruitClass = fruitClasses[i];
    $(fruitClass).append(fruitForGame);
  }
  // return fruitClasses;
}

function setUpGame() {
  // Sets up play of game
  initalizeGlobals();
  // logVals();
  initializeDisplay();
}

function winLoseOrGoOn(){
  // updates browser window when player wins or loses
  if (currentScore === targetNum) {
    wins++;
    playSound("win");
    displayWins();
    gameStatus = "win";
    displayStatus();
    playAnother = true;
    return;
  }
  else if (currentScore > targetNum) {
    losses++;
    playSound("lose");
    displayLosses();
    gameStatus = 'lose';
    displayStatus();
    playAnother = true;
    return;
  }
  // console.log("Did not win or lose so continue")
}

// GAME
//=======================================================

$(document).ready(function() {
    main();
});


// RESUME: 
/*
[] Beautify page as time permits
   (x) margins around blocks
   (x) padding within blocks
   () status counter values spaced well
   (x) background colors
   (x) text in current score boxes -> white
   (x) fonts, sizing, emphasis (general)
   (x) fruit icon size
[x] Add ta-da and groan sounds when round concludes (stretch)
[x] Third round test
[] Clean up code and final test before submission 
*/