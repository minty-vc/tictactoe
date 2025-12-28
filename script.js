const board = document.getElementById('board');
const statusText = document.getElementById('status');
const result = document.getElementById('result');
const resultText = document.getElementById('result-text');
const retryBtn = document.getElementById('retry-btn');
const tgBtn = document.getElementById('tg-btn');

const BOT_USERNAME = 'tictictacbot';

let cells = [];
let gameOver = false;

function startGame() {
  board.innerHTML = '';
  result.classList.add('hidden');
  tgBtn.classList.add('hidden');
  statusText.textContent = 'Твой ход';
  gameOver = false;
  cells = Array(9).fill(null);

  for (let i = 0; i < 9; i++) {
    const btn = document.createElement('button');
    btn.className = 'cell';
    btn.onclick = () => playerMove(i);
    board.appendChild(btn);
  }
}

function playerMove(i) {
  if (cells[i] || gameOver) return;

  cells[i] = 'X';
  render();

  if (checkWin('X')) return win();
  if (cells.every(Boolean)) return draw();

  aiMove();
}

function aiMove() {
  const empty = cells
    .map((v, i) => (v ? null : i))
    .filter(v => v !== null);

  const move = empty[Math.floor(Math.random() * empty.length)];
  cells[move] = 'O';
  render();

  if (checkWin('O')) lose();
}

function render() {
  document.querySelectorAll('.cell').forEach((btn, i) => {
    btn.textContent = cells[i] || '';
  });
}

function checkWin(p) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(w => w.every(i => cells[i] === p));
}

function win() {
  gameOver = true;

  const promo = Math.floor(10000 + Math.random() * 90000).toString();

  resultText.textContent = `Умница! Вот твой промокод: ${promo}`;
  tgBtn.href =ocument.getElementById('board');
const statusText = d
  tgBtn.classList.remove('hidden');
  result.classList.remove('hidden');
}

function lose() {
  gameOver = true;
  resultText.textContent =
    'Ой, сегодня не твой день, попробуешь ещё раз? 💕';
  result.classList.remove('hidden');
}

function draw() {
  gameOver = true;
  resultText.textContent =
    'Ой, ничья! Попробуй ещё раз 😊';
  result.classList.remove('hidden');
}

retryBtn.onclick = startGame;

startGame();
