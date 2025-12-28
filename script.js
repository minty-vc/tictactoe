const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const resultText = document.getElementById("result-text");
const retryBtn = document.getElementById("retry-btn");
const tgBtn = document.getElementById("tg-btn");

let board;
let gameOver;

const BOT_NAME = "tictictacbot";

function startGame() {
  board = Array(9).fill(null);
  gameOver = false;

  boardEl.innerHTML = "";
  boardEl.classList.remove("hidden");
  resultEl.classList.add("hidden");
  tgBtn.classList.add("hidden");

  statusEl.textContent = "Твой ход";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.addEventListener("click", () => playerMove(i, cell));
    boardEl.appendChild(cell);
  }
}

function playerMove(index, cell) {
  if (board[index] || gameOver) return;

  board[index] = "X";
  cell.textContent = "X";
  cell.classList.add("disabled");

  if (checkWin("X")) {
    endGame("win");
    return;
  }

  if (board.every(Boolean)) {
    endGame("draw");
    return;
  }

  computerMove();
}

function computerMove() {
  const empty = board
    .map((v, i) => (v === null ? i : null))
    .filter(v => v !== null);

  const move = empty[Math.floor(Math.random() * empty.length)];
  board[move] = "O";

  const cell = boardEl.children[move];
  cell.textContent = "O";
  cell.classList.add("disabled");

  if (checkWin("O")) {
    endGame("lose");
  }
}

function checkWin(player) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(line => line.every(i => board[i] === player));
}

function endGame(type) {
  gameOver = true;
  boardEl.classList.add("hidden");

  if (type === "win") {
    const promo = Math.floor(10000 + Math.random() * 90000);
    resultText.textContent = `Умница! Вот твой промокод: ${promo}`;

    tgBtn.href =cument.getElementById("board");
const statusEl = 
    tgBtn.classList.remove("hidden");
  }

  if (type === "lose") {
    resultText.textContent = "Ой, сегодня не твой день, попробуешь ещё раз?";
  }

  if (type === "draw") {
    resultText.textContent = "Ой, ничья! Попробуй ещё раз";
  }

  resultEl.classList.remove("hidden");
}

retryBtn.addEventListener("click", startGame);

startGame();
