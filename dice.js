const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore, activePlayer, turnsFinished, playing;

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  turnsFinished = [false, false];
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.style.backgroundColor = '';
  player1El.style.backgroundColor = '';
};

init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  turnsFinished[activePlayer] = true;

  if (turnsFinished.every(finished => finished)) {
    checkWinner();
  } else {
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
  }
};

const checkWinner = () => {
  playing = false;
  if (scores[0] > scores[1]) {
    player0El.style.backgroundColor = '#27ae60'; // Green for winner
  } else if (scores[1] > scores[0]) {
    player1El.style.backgroundColor = '#27ae60';
  } else {
    player0El.style.backgroundColor = '#f1c40f'; // Yellow for draw
    player1El.style.backgroundColor = '#f1c40f';
  }
};

btnRoll.addEventListener('click', () => {
  if (playing && !turnsFinished[activePlayer]) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.jpg`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      scores[activePlayer] = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
