const targetBox = document.getElementById('target-box');
const targetText = document.getElementById('target-text');
const avgScoreEl = document.getElementById('avg-score');
const bestScoreEl = document.getElementById('best-score');
const rankValueEl = document.getElementById('rank-value');

let state = 'IDLE';
let timeoutId = null;
let startTime = 0;
let scores = [];
let bestScore = localStorage.getItem('cyber_arcade_best') || null;

if (bestScore) {
  bestScoreEl.innerText = `${bestScore} ms`;
}

function updateProgress() {
  for (let i = 1; i <= 5; i++) {
    const step = document.getElementById(`p${i}`);
    if (i <= scores.length) {
      step.className = 'p-step done';
    } else if (i === scores.length + 1 && state === 'READY') {
      step.className = 'p-step active';
    } else {
      step.className = 'p-step';
    }
  }
}

function calculateRank(avg) {
  if (avg < 200) return "CYBER GOD [S-TIER]";
  if (avg < 250) return "NEURAL SYNAPSE [A-TIER]";
  if (avg < 320) return "HUMAN STANDARD [B-TIER]";
  if (avg < 450) return "LAGGING SYSTEM [C-TIER]";
  return "SYSTEM FAILURE [D-TIER]";
}

function setGameState(newState, text) {
  state = newState;
  targetBox.className = `target-box state-${newState.toLowerCase() === 'idle' ? 'wait' : newState.toLowerCase()}`;
  targetText.innerText = text;
  updateProgress();
}

function startNextRound() {
  setGameState('READY', `ROUND ${scores.length + 1}/5 // WAIT FOR GREEN`);
  const randomDelay = Math.floor(Math.random() * 2500) + 1500;

  timeoutId = setTimeout(() => {
    setGameState('GO', 'CLICK NOW!');
    startTime = Date.now();
  }, randomDelay);
}

targetBox.addEventListener('click', () => {
  if (state === 'IDLE') {
    if (scores.length === 0 || scores.length === 5) {
      scores = [];
      rankValueEl.innerText = "EVALUATING...";
      avgScoreEl.innerText = "-- ms";
    }
    startNextRound();

  } else if (state === 'READY') {
    clearTimeout(timeoutId);
    scores = [];
    setGameState('IDLE', 'EARLY CLICK! SEQUENCE RESET (CLICK TO RESTART)');

  } else if (state === 'GO') {
    const elapsed = Date.now() - startTime;
    scores.push(elapsed);

    if (!bestScore || elapsed < parseInt(bestScore)) {
      bestScore = elapsed;
      localStorage.setItem('cyber_arcade_best', bestScore);
      bestScoreEl.innerText = `${bestScore} ms`;
    }

    if (scores.length < 5) {
      setGameState('IDLE', `${elapsed} MS! CLICK FOR ROUND ${scores.length + 1}`);
    } else {
      const sum = scores.reduce((a, b) => a + b, 0);
      const avg = Math.round(sum / scores.length);
      
      avgScoreEl.innerText = `${avg} ms`;
      rankValueEl.innerText = calculateRank(avg);

      setGameState('IDLE', `COMPLETE! AVG: ${avg} MS (CLICK TO RETRY)`);
    }
  }
});
