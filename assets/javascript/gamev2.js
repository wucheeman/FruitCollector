// GLOBALS
//=======================================================

// TODO: does 'fruit' need to be global?
var fruitClasses;
var displayFruit

var targetNum;
var currentScore;
var wins;
var losses;
var playAnother;
var continuing = false;


// FUNCTIONS
//=======================================================

function displayCurrentScore() {
  $(".currentScoreArea").text(currentScore);
}

function displayLosses() {
  $("#losses").text(losses);
}

function displayTargetNum() {
  $(".targetNumArea").text("Your target number is: " + targetNum);
}

function displayWins() {
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
}

function initalizeGlobals() {
  // initializes values for newly started game
  console.log("in initializeGlobals")
  targetNum = setTargetNum();
  displayFruit = $(".fruit");
  currentScore = 0;
  playAnother = false;
  if (!continuing) {
    fruitClasses = setUpFruit();
    console.log("with continuing = false, FruitClasses is " + fruitClasses);
    wins = 0;
    losses = 0;
  }
  else {
    console.log("with continuing = true, FruitClasses is " + fruitClasses);
    reInitializeFruit();
  }
}

// function initializeWinsAndLosses() {
//   // sets wins and losses to 0 when game starts
//   if (!continuing) {
//     wins = 0;
//     losses = 0;
//   }
// }

function logVals() {
  // TODO comment out when development is done
  console.log("targetNum: " + targetNum +
              " currentScore: " + currentScore +
              " appleNum: " + appleNum +
              " lemonNum: " + lemonNum +
              " pearNum: " + pearNum + 
              " orangeNum: " + orangeNum );
}

function main() {
  console.log("in main")
  setUpGame();
  play();
  console.log('finished play and still running');
}

// TODO: delete
// function nextRound(){
  // console.log('in nextRound');
  // main();
// }

function play() {
  // play the game until the window is closed
  displayFruit.on("click", ".fruitImage", function() {
    console.log('starting playRound');
    var fruitValue = ($(this).attr("data-fruitvalue"));
    fruitValue = parseInt(fruitValue);
    console.log("This fruit's value is: " + fruitValue);
    currentScore += fruitValue;
    // updateCurrentScoreDisplay();
    displayCurrentScore();
    winLoseOrGoOn();
    continuing = true;
    if (playAnother) {
      console.log("starting a new game");
      setUpGame();
    }
    console.log('at end of play\'s loop');
  }); // close of on-click function
}

function reInitializeFruit() {
  // var fruitClasses = [];
  // for (var j = 0; j < fruitClasses.length; j++) {
  //   fruitClasses.push("." + fruitClasses[j]);
  //   console.log("fruitClasses[" + j + "] is " + fruitClasses[j]);
  // }
  console.log('reinitiazling fruit nums');
  var fruitNums = setFruitNums();
  console.log('fruitNums is ' + fruitNums);
  for (var i = 0; i < fruitClasses.length; i++) {
    console.log($(fruitClasses[i]).attr("data-fruitvalue"));
    $(fruitClasses[i]).attr("data-fruitvalue", fruitNums[i]);
    console.log($(fruitClasses[i]).attr("data-fruitvalue"));
  }
  console.log("exiting reInitializeFruit")
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
  //  TODO: should return random num between 19 - 120
  return 42;
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
    fruitForGame.attr("data-fruitvalue", fruitNums[i]);
    var fruitClass = fruitClasses[i];
    $(fruitClass).append(fruitForGame);
  }
  return fruitClasses;
}

function setUpGame() {
  // Sets up play of game
  initalizeGlobals();
  // TODO - comment out
  logVals();
  initializeDisplay();
}

// TODO: delete?
// function updateCurrentScoreDisplay() {
//   // updates browser window with current score
//   $(".currentScoreArea").text(currentScore);
//   // TODO replace alert with real functionality
//   alert("New score: " + currentScore);
// }

function winLoseOrGoOn(){
  // updates browser window when player wins or loses
  // TODO: replace alerts with real functionality
  // TODO: add logic to restart game after win or loss?
  // TODO: fix bug which outputs 'you win' before updating the display with the final value
  if (currentScore === targetNum) {
    // TODO: better way to do this? Make it DRY?
    alert("You win!");
    wins++;
    displayWins();
    playAnother = true;
    return;
  }
  else if (currentScore > targetNum) {
    // TODO: better way to do this?
    alert("You lose!!");
    losses++;
    displayLosses();
    playAnother = true;
    return;
  }
}

// GAME
//=======================================================

$(document).ready(function() {
    main();
});


// RESUME: 
/*
Restructured game basically works, BUT although I generate new values for each fruit
I am not assigning those values correctly. When the game restarts, each fruit has the
value assigned in the first game. 
The problem is in reInitializeFruit; I don't know how to access dynamically generated elements and change the value of an attribute. Trying v3 to see if I can use static elements.
Once this works, review TODOs. At a minimum, fix the bug noted in winLoseOrGoOn
*/
// defer giving targetNum a random value until game is ready to complete
