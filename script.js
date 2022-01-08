"use strict";

// Selecting Elements
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");

const diceElement = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Global variables
let scores, currentScore, currentPlayer, playing;

// Functions
const switchPlayer = () => {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentScore = 0;
  currentPlayer = currentPlayer ? 0 : 1;
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
};

const initialReset = () => {
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceElement.classList.add("hidden");
  player0Element.classList.remove("player--winner");
  player0Element.classList.add("player--active");
  player1Element.classList.remove("player--winner", "player--active");

  currentPlayer = 0;
  currentScore = 0;
  playing = true;
  scores = [0, 0];
};

// Initial Reset
initialReset();

// rolling dice functionality
btnRoll.addEventListener("click", () => {
  if (playing) {
    // Generate a randpm number between 1 and 6
    const randomNum = Math.trunc(Math.random() * 6 + 1);

    // Display the dice
    diceElement.src = `./images/dices/dice-${randomNum}.png`;
    diceElement.classList.remove("hidden");

    // Check for 1: If 1 then switch to next player else add the score to current player
    if (randomNum !== 1) {
      currentScore += randomNum;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// holding dice functionality
btnHold.addEventListener("click", () => {
  if (playing) {
    // 1. add current score to total score
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];

    // 2. check if score >= 100: if true then player wins else switch player
    if (scores[currentPlayer] >= 100) {
      // current player wins
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove("player--active");
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add("player--winner");
      playing = false;
      diceElement.classList.add("hidden");
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// New game functionality
btnNew.addEventListener("click", initialReset);
