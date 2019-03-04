var game = {
  words: [
    "rail",
    "lightning",
    "instagib",
    "nail",
    "shambler",
    "plasma",
    "strafe",
    "rocket",
    "impressive",
    "excellent",
    "heavy",
    "mega",
    "spawn",
    "slipgate",
    "bunnyhop"
  ],
  emptyWord: [],
  chosenWord: [],
  incorrectGuesses: [],
  remainingGuesses: 10,
  correctCounter: 0,
  min: Math.ceil(0),
  max: 0,
  ended: false,
  winTotal: 0,
  combo: 0,

  getRandomInt: function() {
    game.max = Math.floor(game.words.length);
    return Math.floor(Math.random() * (game.max - game.min)) + game.min;
  },

  initializeGame: function() {
    var rand = game.getRandomInt();
    game.chosenWord = game.words[rand];

    game.emptyWord = [];
    for (var i = 0; i < game.chosenWord.length; i++) {
      game.emptyWord[i] = "_";
    }
  },

  checkGuess: function(guess) {
    for (var i = 0; i < game.chosenWord.length; i++) {
      if (guess == game.chosenWord[i]) {
        game.emptyWord[i] = game.chosenWord[i];
        game.correctCounter++;
        //if (combo == 1) {
        //put impressive sound here
        //}
        game.combo = 1;
        console.log("test correct");
      } else if (game.correctCounter == 0 && i == game.chosenWord.length - 1) {
        if (game.incorrectGuesses.includes(guess) != true) {
          game.remainingGuesses--;
          game.incorrectGuesses.push(guess);
          game.combo = 0;
        }
      }
      if (game.correctCounter > 0 && i == game.chosenWord.length - 1) {
        game.correctCounter = 0;
      }
      console.log("test");
    }
  },

  checkWin: function() {
    for (var i = 0; i < game.emptyWord.length; i++) {
      if (game.emptyWord[i] != game.chosenWord[i]) {
        return false;
      }
    }
    game.winTotal++;
    return true;
  },

  checkLoss: function() {
    if (game.remainingGuesses == 0) {
      return true;
    } else {
      return false;
    }
  },

  resetGame: function() {
    game.initializeGame();
    game.remainingGuesses = 10;
    game.incorrectGuesses = [];
  }
};

game.initializeGame();

document.getElementById("emptyW").textContent = game.emptyWord.join(" ");
document.getElementById("remainingG").textContent =
  "Remaining guesses: " + game.remainingGuesses;
document.getElementById("guesses").textContent = game.incorrectGuesses;
document.getElementById("winC").textContent = game.winTotal;

document.onkeyup = function(event) {
  if (game.ended == true) {
    game.ended = false;
    document.getElementById("remainingG").textContent =
      "Remaining guesses: " + game.remainingGuesses;
    document.getElementById("emptyW").textContent = game.emptyWord.join(" ");
    document.getElementById("guesses").textContent = game.incorrectGuesses.join(
      " "
    );
    document.getElementById("winS").textContent = "";
    document.getElementById("winC").textContent = game.winTotal;
  } else {
    game.checkGuess(event.key);

    document.getElementById("guesses").textContent = game.incorrectGuesses.join(
      " "
    );
    document.getElementById("emptyW").textContent = game.emptyWord.join(" ");
    document.getElementById("remainingG").textContent =
      "Remaining guesses: " + game.remainingGuesses;
    document.getElementById("winC").textContent = game.winTotal;

    if (game.checkWin()) {
      if (game.remainingGuesses == 10) {
        //add holy shit sound
      }
      game.resetGame();
      game.ended = true;
      document.getElementById("winS").textContent =
        "You Won! Press any key to restart...";
    }
    if (game.checkLoss()) {
      game.resetGame();
      game.ended = true;
      document.getElementById("winS").textContent =
        "You Lost! Press any key to restart...";
    }
  }
};
