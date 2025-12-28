const board = document.getElementById('board');
const statusText = document.getElementById('status');
const result = document.getElementById('result');
const resultText = document.getElementById('result-text');
const retryBtn = document.getElementById('retry-btn');
const tgBtn = document.getElementById('tg-btn');

const BACKEND_URL = 'https://tictactoe-bm3a.onrender.com';

const BOT_URL = 'https://t.me/tictictacbot';

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

function playerMove(index) {
  if (cells[index] || gameOver) return;

  cells[index] = 'X';
  render();

  if (checkWin('X')) {
    win();
    return;
  }

  if (cells.every(Boolean)) {
    draw();
    return;
  }

  aiMove();
}

function aiMove() {
  const emptyCells = cells
    .map((v, i) => (v ? null : i))
    .filter(v => v !== null);

  const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  cells[move] = 'O';
  render();

  if (checkWin('O')) {
    lose();
  }
}

function render() {
  document.querySelectorAll('.cell').forEach((btn, i) => {
    btn.textContent = cells[i] || '';
  });
}

function checkWin(player) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return wins.some(line =>
    line.every(i => cells[i] === player)
  );
}

function win() {
  gameOver = true;

  const promo = Math.floor(10000 + Math.random() * 90000).toString();

  fetch(`${BACKEND_URL}/promo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ promo })
  });

  resultText.textContent = `Умница! Вот твой промокод: ${promo}`;
  tgBtn.href = BOT_URL;
  tgBtn.classList.remove('hidden');
  result.classList.remove('hidden');
}

function lose() {
  gameOver = true;
  resultText.textContent =
    'Ой, сегодня не твой день, попробуешь ещё раз?';
  result.classList.remove('hidden');
}

function draw() {
  gameOver = true;
  resultText.textContent =
    'Ой, ничья! Попробуй ещё раз';
  result.classList.remove('hidden');
}

retryBtn.onclick = startGame;

startGame();
