const targetBox = document.getElementById('target-box');
const targetText = document.getElementById('target-text');
const lastScoreEl = document.getElementById('last-score');
const bestScoreEl = document.getElementById('best-score');

let state = 'WAIT';
let timeoutId = null;
let startTime = 0;
let bestScore = localStorage.getItem('cyber_best_score') || null;

if (bestScore) {
  bestScoreEl.innerText = `${bestScore} ms`;
}

function setGameState(newState, text) {
  state = newState;
  targetBox.className = `target-box state-${newState.toLowerCase()}`;
  targetText.innerText = text;
}

targetBox.addEventListener('click', () => {
  if (state === 'WAIT') {
    setGameState('READY', 'WAIT FOR GREEN...');

    const randomDelay = Math.floor(Math.random() * 3000) + 2000;
    
    timeoutId = setTimeout(() => {
      setGameState('GO', 'CLICK NOW!');
      startTime = Date.now();
    }, randomDelay);

  } else if (state === 'READY') {
    clearTimeout(timeoutId);
    setGameState('WAIT', 'TOO EARLY! CLICK TO RETRY');

  } else if (state === 'GO') {
    const reactionTime = Date.now() - startTime;
    lastScoreEl.innerText = `${reactionTime} ms`;

    if (!bestScore || reactionTime < bestScore) {
      bestScore = reactionTime;
      localStorage.setItem('cyber_best_score', bestScore);
      bestScoreEl.innerText = `${bestScore} ms`;
    }

    setGameState('WAIT', `${reactionTime} MS // CLICK TO RETRY`);
  }
});