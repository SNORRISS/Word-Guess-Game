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
        correctSound.play();
        if (game.combo == 1) {
          comboSound.play();
        }
        game.combo = 1;
        console.log("test correct");
      } else if (game.correctCounter == 0 && i == game.chosenWord.length - 1) {
        if (game.incorrectGuesses.includes(guess) != true) {
          game.remainingGuesses--;
          game.incorrectGuesses.push(guess);
          game.combo = 0;
          incorrectSound.play();
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


var correctSound = document.createElement("audio");
correctSound.setAttribute("src", "./assets/sounds/hit.wav");
correctSound.setAttribute("type", "audio/wav");

var incorrectSound = document.createElement("audio");
incorrectSound.setAttribute("src", "./assets/sounds/jump1.wav");
incorrectSound.setAttribute("type", "audio/wav");

var comboSound = document.createElement("audio");
comboSound.setAttribute("src", "./assets/sounds/impressive.wav");
comboSound.setAttribute("type", "audio/wav");

var fullSound = document.createElement("audio");
fullSound.setAttribute("src", "./assets/sounds/holyshit.wav");
fullSound.setAttribute("type", "audio/wav");

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
        fullSound.play();
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
