// ======================
// НАСТРОЙКИ
// ======================

const BACKEND_URL = 'https://tictactoe-bm3a.onrender.com';
 
// ======================
// DOM
// ======================
 
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
 
// ======================
// ИГРОВЫЕ ДАННЫЕ
// ======================
 
let board = Array(9).fill(null);
let gameActive = true;
 
const PLAYER = 'X';
const AI = 'O';
 
const WIN_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
 
// ======================
// ИНИЦИАЛИЗАЦИЯ
// ======================
 
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});
 
restartBtn.addEventListener('click', restartGame);
 
// ======================
// ОСНОВНАЯ ЛОГИКА
// ======================
 
function handleCellClick(index) {
  if (!gameActive || board[index] !== null) return;
 
  makeMove(index, PLAYER);
 
  if (checkWin(PLAYER)) {
    handlePlayerWin();
    return;
  }
 
  if (checkDraw()) {
    handleDraw();
    return;
  }
 
  setTimeout(makeAIMove, 500);
}
 
function makeAIMove() {
  if (!gameActive) return;
 
  const emptyCells = board
    .map((value, index) => (value === null ? index : null))
    .filter(index => index !== null);
 
  const randomIndex =
    emptyCells[Math.floor(Math.random() * emptyCells.length)];
 
  makeMove(randomIndex, AI);
 
  if (checkWin(AI)) {
    handlePlayerLose();
    return;
  }
 
  if (checkDraw()) {
    handleDraw();
  }
}
 
function makeMove(index, symbol) {
  board[index] = symbol;
  cells[index].textContent = symbol;
}
 
// ======================
// ПРОВЕРКИ
// ======================
 
function checkWin(symbol) {
  return WIN_COMBINATIONS.some(combination =>
    combination.every(index => board[index] === symbol)
  );
}
 
function checkDraw() {
  return board.every(cell => cell !== null);
}
 
// ======================
// СОСТОЯНИЯ ИГРЫ
// ======================
 
function handlePlayerWin() {
  gameActive = false;
 
  const promoCode = generatePromoCode();
 
  statusText.textContent = `Ты победила 🎉\nТвой промокод: ${promoCode}`;
 
  sendPromoCodeToBot(promoCode);
}
 
function handlePlayerLose() {
  gameActive = false;
  statusText.textContent =
    'Сегодня не твой день, попробуешь ещё раз? 💕';
}
 
function handleDraw() {
  gameActive = false;
  statusText.textContent = 'Ничья 🤍';
}
 
// ======================
// ПРОМОКОД + BACKEND
// ======================
 
function generatePromoCode() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}
 
function sendPromoCodeToBot(promoCode) {
  fetch(`${BACKEND_URL}/win`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ promoCode })
  }).catch(() => {
    // для тестового задания ошибки можно игнорировать
  });
}
 
// ======================
// РЕСТАРТ
// ======================
 
function restartGame() {
  board = Array(9).fill(null);
  gameActive = true;
 
  cells.forEach(cell => (cell.textContent = ''));
  statusText.textContent = '';
}
