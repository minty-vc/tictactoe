const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const tgLink = document.getElementById('tg-link');

const BACKEND_URL = 'https://tictactoe-bm3a.onrender.com';

let board = Array(9).fill(null);
let gameActive = true;

const PLAYER = '❌';
const BOT = '⭕️';

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach((cell, i) => {
  cell.addEventListener('click', () => {
    if (!gameActive || board[i]) return;

    board[i] = PLAYER;
    cell.textContent = PLAYER;

    if (checkWin(PLAYER)) return win();
    if (draw()) return tie();

    setTimeout(botMove, 400);
  });
});

restartBtn.onclick = reset;

function botMove() {
  const empty = board.map((v,i)=>v?null:i).filter(v=>v!==null);
  const i = empty[Math.floor(Math.random()*empty.length)];
  board[i] = BOT;
  cells[i].textContent = BOT;

  if (checkWin(BOT)) lose();
  else if (draw()) tie();
}

function win() {
  gameActive = false;
  const code = Math.floor(10000 + Math.random() * 90000);
  statusText.textContent = `Умница! Вот твой промокод: ${code} 🎁`;
  restartBtn.style.display = 'none';
  tgLink.style.display = 'block';

  fetch(BACKEND_URL, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ promoCode: code })
  });
}

function lose() {
  gameActive = false;
  statusText.textContent = 'Ой, я случайно! Попробуешь ещё раз? 💕';
}

function tie() {
  gameActive = false;
  statusText.textContent = 'Ой, ничья! Попробуй ещё раз 💖';
}

function reset() {
  board.fill(null);
  cells.forEach(c => c.textContent = '');
  statusText.textContent = 'Твой ход 💖';
  gameActive = true;
  restartBtn.style.display = 'block';
  tgLink.style.display = 'none';
}

function checkWin(p) {
  return wins.some(w => w.every(i => board[i] === p));
}

function draw() {
  return board.every(c => c);
}
