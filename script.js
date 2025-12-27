const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const resultEl = document.getElementById('result');
const restartBtn = document.getElementById('restart');
 
let board = Array(9).fill(null);
let gameOver = false;
 
const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];
 
// отрисовка поля
function render() {
  boardEl.innerHTML = '';
  board.forEach((cell, i) => {
    const div = document.createElement('div');
    div.className = 'cell';
    div.textContent = cell || '';
    div.onclick = () => move(i);
    boardEl.appendChild(div);
  });
}
 
// ход игрока
function move(i) {
  if (board[i] || gameOver) return;
 
  board[i] = '❌';
  if (checkEnd()) return;
 
  computerMove();
  checkEnd();
  render();
}
 
// ход компьютера (рандом)
function computerMove() {
  const empty = board
    .map((v, i) => v ? null : i)
    .filter(v => v !== null);
 
  if (!empty.length) return;
 
  const move = empty[Math.floor(Math.random() * empty.length)];
  board[move] = '⭕';
}
 
// проверка победы / поражения / ничьи
function checkEnd() {
  for (const [a,b,c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
 
      if (board[a] === '❌') {
        win();
      } else {
        statusEl.textContent = 'Сегодня не твой день, попробуешь ещё раз? 💕';
      }
      return true;
    }
  }
 
  if (!board.includes(null)) {
    gameOver = true;
    statusEl.textContent = 'Ничья 🌸';
    return true;
  }
 
  return false;
}
 
// победа игрока
function win() {
  statusEl.textContent = 'Ты победила 🎉';
 
  const promo = generatePromo();
  const botName = 'YOUR_BOT_USERNAME'; // ← заменить
 
  const tgLink = `https://t.me/${botName}?start=promo_${promo}`;
 
  resultEl.innerHTML = `
    <div>Твой промокод: <strong>${promo}</strong></div>
    <a class="telegram-btn" href="${tgLink}" target="_blank">
      Получить в Telegram 💌
    </a>
  `;
}
 
// генерация 5-значного кода
function generatePromo() {
  return Math.floor(10000 + Math.random() * 90000);
}
 
// рестарт
restartBtn.onclick = () => {
  board = Array(9).fill(null);
  gameOver = false;
  statusEl.textContent = 'Твой ход 💕';
  resultEl.innerHTML = '';
  render();
};
 
render();
