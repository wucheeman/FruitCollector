// GLOBALS
//=======================================================

var targetNum;
// TODO: does this need to be global?
var fruit;
var displayFruit

var currentScore;
var wins;
var losses;

// FUNCTIONS
//=======================================================

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

function setFruitNums() {
  // initializes fruit values to random num between 1 - 12
  // TODO make these random
  appleNum = 1;
  lemonNum = 2;
  pearNum = 5;
  orangeNum = 10;
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
}

// GAME
//=======================================================

setUpGame();
console.log("checking on click function");
displayFruit.on("click", ".fruitImage", function() {
  console.log("you clicked on me!");
}); // close of on-click function





/*
  // This time, our click event applies to every single crystal on the page. Not just one.
  crystals.on("click", ".crystal-image", function() {

    // Determining the crystal's value requires us to extract the value from the data attribute.
    // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
    // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
    // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter

    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
    // We then add the crystalValue to the user's "counter" which is a global variable.
    // Every click, from every crystal adds to the global counter.
    counter += crystalValue;

    // All of the same game win-lose logic applies. So the rest remains unchanged.
    alert("New score: " + counter);

    if (counter === targetNumber) {
      alert("You win!");
    }

    else if (counter >= targetNumber) {
      alert("You lose!!");
    }

  });
  */
