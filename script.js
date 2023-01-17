"use strict";

// Selecting Elements
const btnnewGame = document.getElementsByClassName("btn")[0];
const btnRoll = document.getElementsByClassName("btn")[1];
const btnHold = document.getElementsByClassName("btn")[2];

const diceImageEl = document.getElementsByClassName("dice")[0];
const score0El = document.getElementById("score-0");
const score1El = document.getElementById("score-1");
const currentScoreP0 = document.getElementById("current-0");
const currentScoreP1 = document.getElementById("current-1");
const player0 = document.getElementsByClassName("player-0")[0];
const player1 = document.getElementsByClassName("player-1")[0];

let scores, currentScore, activePlayer, playing;

const init = function () {
  // Starting condition
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScoreP0.textContent = 0;
  currentScoreP1.textContent = 0;
  diceImageEl.classList.add("hidden");

  player0.classList.remove("player-winner");
  player1.classList.remove("player-winner");
  player0.classList.add("player-active");
  player1.classList.remove("player-active");
};

init();

//change chance function
const chanceChange = function () {
  currentScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle("player-active");
  player1.classList.toggle("player-active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    //Generate random number
    const randomNum = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceImageEl.classList.remove("hidden");
    diceImageEl.src = `dice-${randomNum}.png`;

    // checked for rolled 1
    if (randomNum === 1) {
      // switch chance
      chanceChange();
    } else {
      // keep adding in current score
      currentScore += randomNum;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // Adding scores in active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    // condition when player wins
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceImageEl.classList.add("hidden");

      // change color when player wins
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");
    }

    chanceChange();
  }
});

btnnewGame.addEventListener("click", init);
