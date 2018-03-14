// GLOBALS
//=======================================================

// TODO: does 'fruit' need to be global?
var fruit;
var displayFruit

var targetNum;
var currentScore;
var wins;
var losses;

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

function initializeButtons() {
  return;
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
  targetNum = setTargetNum();
  fruit = setUpFruit();
  displayFruit = $(".fruit");
  currentScore = 0;
  wins = 0;
  losses = 0;
}

function logVals() {
  // TODO comment out when development is done
  console.log("targetNum: " + targetNum +
              " currentScore: " + currentScore +
              " appleNum: " + appleNum +
              " lemonNum: " + lemonNum +
              " pearNum: " + pearNum + 
              " orangeNum: " + orangeNum );
}

function playRound() {
  // functionality for a single round of the game
  displayFruit.on("click", ".fruitImage", function() {
    var fruitValue = ($(this).attr("data-fruitvalue"));
    fruitValue = parseInt(fruitValue);
    console.log("This fruit's value is: " + fruitValue);
    currentScore += fruitValue;
    updateCurrentScoreDisplay();
    winLoseOrGoOn();
  }); // close of on-click function
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
  var apple;
  var lemon;
  var pear;
  var orange;
  fruit = [apple, lemon, pear, orange];

  // values for HTML src attribute
  var fruitSrcs = ["assets/images/apple.png",
                   "assets/images/lemon.png",
                   "assets/images/pear.png",
                   "assets/images/orange.png" ];

  // data for each fruit's secret number
  var fruitNums = setFruitNums();
  // HTML class attributes
  var fruitClasses = [".apple", ".lemon", ".pear", ".orange"];

  for (var i = 0; i < fruit.length; i++) {
    var fruitForGame = $("<img>");
    fruitForGame.addClass("fruitImage");
    fruitForGame.attr("src", fruitSrcs[i]);
    fruitForGame.attr("data-fruitvalue", fruitNums[i]);
    var fruitClass = fruitClasses[i];
    $(fruitClass).append(fruitForGame);
  }
}

function setUpGame() {
  // Sets up play of game
  initalizeGlobals();
  logVals();
  initializeDisplay();
  initializeButtons();
}

function updateCurrentScoreDisplay() {
  // updates browser window with current score
  // TODO replace alert with real functionality
  alert("New score: " + currentScore);
}

function winLoseOrGoOn(){
  // updates browser window when player wins or loses
  // TODO: replace alerts with real functionality
  // TODO: add logic to restart game after win or loss?
  if (currentScore === targetNum) {
    alert("You win!");
  }
  else if (currentScore > targetNum) {
    alert("You lose!!");
  }
}

// GAME
//=======================================================

setUpGame();
playRound();

// RESUME: 
// defer giveing targetNum a random value until game is ready to complete
