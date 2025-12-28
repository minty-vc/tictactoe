const BOT_USERNAME = "tictictacbot";

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const resultTextEl = document.getElementById("result-text");
const retryBtn = document.getElementById("retry-btn");
const tgBtn = document.getElementById("tg-btn");

let board = Array(9).fill(null);
let gameOver = false;

// создаём клетки
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.dataset.index = i;
  cell.addEventListener("click", onPlayerMove);
  boardEl.appendChild(cell);
}

const cells = document.querySelectorAll(".cell");

function onPlayerMove(e) {
  const index = e.target.dataset.index;
  if (board[index] || gameOver) return;

  makeMove(index, "X");

  if (checkWin("X")) return endGame("win");
  if (isDraw()) return endGame("draw");

  setTimeout(computerMove, 400);
}

function computerMove() {
  const empty = board
    .map((v, i) => v === null ? i : null)
    .filter(v => v !== null);

  const move = empty[Math.floor(Math.random() * empty.length)];
  makeMove(move, "O");

  if (checkWin("O")) return endGame("lose");
  if (isDraw()) return endGame("draw");
}

function makeMove(i, s) {
  board[i] = s;
  cells[i].textContent = s;
}

function checkWin(p) {
  const w = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return w.some(c => c.every(i => board[i] === p));
}

function isDraw() {
  return board.every(c => c !== null);
}

function endGame(type) {
  gameOver = true;
  resultEl.classList.remove("hidden");
  tgBtn.classList.add("hidden");

  if (type === "win") {
    const promo = generatePromo();
    resultTextEl.textContent = `Умница! Вот твой промокод: ${promo}`;
    tgBtn.href =E = "https://t.me/tictictacbot";

const boardEl = document.getElem
    tgBtn.classList.remove("hidden");
  }

  if (type === "lose") {
    resultTextEl.textContent =
      "Ой, я случайно! Попробуешь ещё раз?";
  }

  if (type === "draw") {
    resultTextEl.textContent =
      "Ничья! Попробуй ещё раз";
  }
}

function generatePromo() {
  return Math.floor(10000 + Math.random() * 90000);
}

retryBtn.onclick = () => {
  board.fill(null);
  gameOver = false;
  statusEl.textContent = "Твой ход ❤️";
  resultEl.classList.add("hidden");
  cells.forEach(c => c.textContent = "");
};
