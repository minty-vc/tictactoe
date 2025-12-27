const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const tgLink = document.getElementById('tg-link');
 
const RENDER_URL = 'https://ТВОЙ-RENDER-URL/send-promo';
 
let board = Array(9).fill(null);
let gameActive = true;
 
const PLAYER = '❌';
const BOT = '⭕';
 
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];
 
// =======================
// INIT
// =======================
 
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handlePlayerMove(index));
});
 
restartBtn.addEventListener('click', resetGame);
 
// =======================
// GAME LOGIC
// =======================
 
function handlePlayerMove(index) {
  if (!gameActive || board[index]) return;
 
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
 
function botMove() {
  const empty = board
    .map((v, i) => v === null ? i : null)
    .filter(v => v !== null);
 
  if (empty.length === 0) return;
 
  const index = empty[Math.floor(Math.random() * empty.length)];
  makeMove(index, BOT);
 
  if (checkWin(BOT)) {
    handleLose();
    return;
  }
 
  if (isDraw()) {
    handleDraw();
  }
}
 
function makeMove(index, symbol) {
  board[index] = symbol;
  cells[index].textContent = symbol;
}
 
// =======================
// STATES
// =======================
 
function handleWin() {
  gameActive = false;
 
  const promoCode = generatePromoCode();
 
  statusText.textContent = `Умница! Вот твой промокод: ${promoCode} 🎁`;
 
  restartBtn.style.display = 'none';
  tgLink.style.display = 'inline-block';
  tgLink.href = 'https://t.me/ИМЯ_ТВОЕГО_БОТА';
 
  fetch(RENDER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ promoCode })
  }).catch(() => {
    console.warn('Failed to send promo to backend');
  });
}
 
function handleLose() {
  gameActive = false;
  statusText.textContent = 'Ой, сегодня не твой день, попробуешь ещё раз? 💕';
}
 
function handleDraw() {
  gameActive = false;
  statusText.textContent = 'Ой, ничья! Попробуй ещё раз 💖';
}
 
// =======================
// HELPERS
// =======================
 
function checkWin(player) {
  return winPatterns.some(pattern =>
    pattern.every(i => board[i] === player)
  );
}
 
function isDraw() {
  return board.every(cell => cell !== null);
}
 
function resetGame() {
  board = Array(9).fill(null);
  gameActive = true;
 
  cells.forEach(cell => cell.textContent = '');
 
  statusText.textContent = 'Твой ход 💖';
  restartBtn.style.display = 'inline-block';
  tgLink.style.display = 'none';
}
 
function generatePromoCode() {
  return Math.floor(10000 + Math.random() * 90000);
}
