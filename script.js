'use strict';

// status variables
let isTheGameRunning = true;
let current_score = 0;
let current_player = 0;
let scors = [0, 0];

//Dom Elements
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
let player0_scoreE = document.getElementById('score--0');
let player1_scoreE = document.getElementById('score--1');
let player0_current_score = document.getElementById('current--0');
let player1_current_score = document.getElementById('current--1');
let dice = document.querySelector('.dice');

//Buttons
const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

/**
 * ->clear the result for 2 players
 * ->clear the current collected scor for 2 players
 * ->hide the dice
 */
const inti = function () {
  scors[0] = scors[1] = 0;
  isTheGameRunning = true;
  player0_scoreE.textContent = 0;
  player1_scoreE.textContent = 0;
  player0_current_score.textContent = 0;
  player1_current_score.textContent = 0;
  dice.classList.add('hidden');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
};


/**
    - add current collected score to current player and update it in the UI
    - clear the current score variable
    - clear the current collected score from the current player 
    - swith the current player [0/1] according to the current state
*/
const swithcPlayer = function () {
  // scors[current_player]+=current_score;
  // document.getElementById(`score--${current_player}`).textContent=scors[current_player];
  current_score = 0;
  document.getElementById(`current--${current_player}`).textContent = 0;
  current_player = current_player === 1 ? 0 : 1;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
inti();

rollBtn.addEventListener('click', function () {
  if (isTheGameRunning) {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.setAttribute('src',`./images/dice-${diceNumber}.png`);

    //check the diceNumber if it 1 or not
    if (diceNumber !== 1) {
      /**
       *  add the current roll value to the current score
       *  display current score
       *  save the current score of the current player to scores[]
       */
      current_score += diceNumber;
      document.getElementById(`current--${current_player}`).textContent =
        current_score;
    } else {
      // switch the current player
      swithcPlayer();
    }
  }
});
/**
    add the current score to the current player 
    display it to the ui
 */
holdBtn.addEventListener('click', function () {
  if (isTheGameRunning) {
    scors[current_player] += current_score;
    document.getElementById(`score--${current_player}`).textContent =
      scors[current_player];

    //check if the current player win
    if (scors[current_player] >= 12) {
      /**
    - stop the game
    - hide the dice
    - remove the player--active class from the winner player
    - add player--winner class to the winner player  
     */

      isTheGameRunning = false;
      dice.classList.remove('hidden');
      document
        .querySelector(`.player--${current_player}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${current_player}`)
        .classList.add('player--winner');
    } else {
      //swith player
      swithcPlayer();
    }
  }
});

newGameBtn.addEventListener('click', inti);
