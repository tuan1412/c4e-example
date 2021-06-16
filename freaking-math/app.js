let score = 0;
let first = 4;
let second = 8;
let sum = 12;

let scoreEl = document.getElementById('scoreEl');
let calEl = document.getElementById('calEl');
let myBarEl = document.getElementById('myBar');
let yesBtn = document.getElementById('yesBtn');
let noBtn = document.getElementById('noBtn');
let lastScoreEl = document.getElementById('lastScore');

function changeScore (changeScore) {
  score = changeScore;
  scoreEl.innerHTML = changeScore;
}

function genRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function resetMatch () {
  first = 4;
  second = 8;
  sum = 12;
  calEl.innerHTML = `${first} + ${second} = ${sum}`;
}

function genMatch() {
  first = genRandomNumber(0, 10);
  second = genRandomNumber(0, 10);
  sum = genRandomNumber(first + second / 2, first + 3 * second / 2);

  calEl.innerHTML = `${first} + ${second} = ${sum}`;
}

let timer = null;
let width = 100;

function resetProgress() {
  myBarEl.style.width = `${100}%`;
  width = 100;
  if (timer) clearInterval(timer);
}

function startProgress() {
  resetProgress();

  timer = setInterval(function() {
    if (width <=0) {
      clearInterval(timer)
      resetMatch();
    } else {
      width--;
      myBarEl.style.width = `${width}%`;
    }
  }, 20);
}

function genLastScore() {
  lastScore.innerHTML = `Last score: ${score}`
}

function resetGame() {
  genLastScore();
  changeScore(0)
  resetProgress();
  resetMatch()
}

function checkResult(yes) {
  let trueCal = first + second === sum;
  let win = (yes && trueCal) || (!yes && !trueCal);

  if (win) {
    changeScore(score + 1)
    genMatch();
    startProgress();
  } else {
    resetGame();
  }
}

yesBtn.addEventListener('click', function() {
  checkResult(true);
})

noBtn.addEventListener('click', function() {
  checkResult(false);
})

