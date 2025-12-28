// ====== НАСТРОЙКИ ======
const BOT_USERNAME = "tictictacbot"; // без @

// ====== DOM ======
const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const resultTextEl = document.getElementById("result-text");
const retryBtn = document.getElementById("retry-btn");
const tgBtn = document.getElementById("tg-btn");

// ====== ИГРА ======
let board = Array(9).fill(null);
let gameOver = false;

// ====== СОЗДАЁМ ПОЛЕ ======
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.dataset.index = i;
  cell.addEventListener("click", onPlayerMove);
  boardEl.appendChild(cell);
}

const cells = document.querySelectorAll(".cell");

// ====== ЛОГИКА ======
function onPlayerMove(e) {
  const index = e.target.dataset.index;
  if (board[index] || gameOver) return;

  makeMove(index, "X");

  if (checkWin("X")) {
    endGame("win");
    return;
  }

  if (isDraw()) {
    endGame("draw");
    return;
  }

  setTimeout(computerMove, 400);
}

function computerMove() {
  const empty = board
    .map((v, i) => (v === null ? i : null))
    .filter(v => v !== null);

  if (empty.length === 0) return;

  const move = empty[Math.floor(Math.random() * empty.length)];
  makeMove(move, "O");

  if (checkWin("O")) {
    endGame("lose");
    return;
  }

  if (isDraw()) {
    endGame("draw");
  }
}

function makeMove(index, symbol) {
  board[index] = symbol;
  cells[index].textContent = symbol;
}

function checkWin(player) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(combo =>
    combo.every(i => board[i] === player)
  );
}

function isDraw() {
  return board.every(cell => cell !== null);
}

// ====== КОНЕЦ ИГРЫ ======
function endGame(type) {
  gameOver = true;
  resultEl.classList.remove("hidden");
  statusEl.textContent = "";

  // всегда показываем retry
  retryBtn.style.display = "block";
  tgBtn.classList.add("hidden");

  if (type === "win") {
    const promo = generatePromo();
    resultTextEl.textContent = `Умница! Вот твой промокод: ${promo}`;

    tgBtn.href =И ======
const BOT_USERNAME = "tictictacbot"; // без 
    tgBtn.classList.remove("hidden");
  }

  if (type === "lose") {
    resultTextEl.textContent =
      "Ой, сегодня не твой день, попробуешь ещё раз? 💕";
  }

  if (type === "draw") {
    resultTextEl.textContent =
      "Ой, ничья! Попробуй ещё раз 🤍";
  }
}

// ====== ПРОМОКОД ======
function generatePromo() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

// ====== РЕСТАРТ ======
retryBtn.addEventListener("click", () => {
  board = Array(9).fill(null);
  gameOver = false;
  statusEl.textContent = "Твой ход ❤️";
  resultEl.classList.add("hidden");
  cells.forEach(c => c.textContent = "");
});
