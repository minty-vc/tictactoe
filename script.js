const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const tgLink = document.getElementById('tg-link');

let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const PLAYER = 'X';
const BOT = 'O';

const WIN_COMBOS = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || board[index] !== '') return;

  makeMove(index, PLAYER);

  if (checkWin(PLAYER)) {
    handleWin();
    return;
  }

  if (isDraw()) {
    handleDraw();
    return;
  }

  setTimeout(botMove, 400);
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
}

function botMove() {
  const empty = board
    .map((v, i) => v === '' ? i : null)
    .filter(v => v !== null);

  if (!empty.length) return;

  const move = empty[Math.floor(Math.random() * empty.length)];
  makeMove(move, BOT);

  if (checkWin(BOT)) {
    handleLose();
    return;
  }

  if (isDraw()) {
    handleDraw();
  }
}

function checkWin(player) {
  return WIN_COMBOS.some(combo =>
    combo.every(i => board[i] === player)
  );
}

function isDraw() {
  return board.every(cell => cell !== '');
}

function handleWin() {
  gameActive = false;

  const promo = Math.floor(10000 + Math.random() * 90000);

  statusText.textContent = `Умница! Вот твой промокод: ${promo} 🎉`;

  tgLink.href =ument.querySelectorAll('.cell');
const statusText 
  tgLink.style.display = 'block';

  restartBtn.style.display = 'none';
}

function handleLose() {
  gameActive = false;
  statusText.textContent = 'Ой, сегодня не твой день, попробуешь ещё раз? 💕';
  restartBtn.style.display = 'block';
}

function handleDraw() {
  gameActive = false;
  statusText.textContent = 'Ой, ничья! Попробуй ещё раз 🤍';
  restartBtn.style.display = 'block';
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;

  cells.forEach(cell => cell.textContent = '');

  statusText.textContent = 'Твой ход ❤️';
  tgLink.style.display = 'none';
  restartBtn.style.display = 'block';
}

cells.forEach(cell =>
  cell.addEventListener('click', handleCellClick)
);

restartBtn.addEventListener('click', restartGame);
