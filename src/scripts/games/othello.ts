import { type Board, type Cell, type Pos, EMPTY, BLACK, WHITE, SIZE, CELL, BOARD_PX, createBoard, getFlips, getValidMoves, makeMove, countPieces } from "./othello-board";

const canvas = document.getElementById("board") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const statusEl = document.getElementById("status")!;
const scoreEl = document.getElementById("score")!;
const depthEl = document.getElementById("depth") as HTMLSelectElement;
const newGameEl = document.getElementById("newgame")!;

const worker = new Worker(new URL("./othello-worker.ts", import.meta.url), { type: "module" });

let board: Board;
let playerColor: Cell = BLACK;
let aiColor: Cell = WHITE;
let currentTurn: Cell = BLACK;
let gameOver = false;
let aiThinking = false;
let playerGoesFirst = true;

// HiDPI setup
const dpr = window.devicePixelRatio || 1;
canvas.width = BOARD_PX * dpr;
canvas.height = BOARD_PX * dpr;
ctx.scale(dpr, dpr);

// ---- Rendering ----

function draw(): void {
  const validMoves = !gameOver && !aiThinking && currentTurn === playerColor ? getValidMoves(board, playerColor) : [];

  // Board background
  ctx.fillStyle = "#2d8b4e";
  ctx.fillRect(0, 0, BOARD_PX, BOARD_PX);

  // Grid lines
  ctx.strokeStyle = "#1a5c30";
  ctx.lineWidth = 1;
  for (let i = 0; i <= SIZE; i++) {
    ctx.beginPath();
    ctx.moveTo(i * CELL, 0);
    ctx.lineTo(i * CELL, BOARD_PX);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * CELL);
    ctx.lineTo(BOARD_PX, i * CELL);
    ctx.stroke();
  }

  // Guide dots
  ctx.fillStyle = "#1a5c30";
  const dots: Pos[] = [
    [2, 2],
    [2, 6],
    [6, 2],
    [6, 6],
  ];
  for (const [r, c] of dots) {
    ctx.beginPath();
    ctx.arc(c * CELL, r * CELL, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Pieces
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] !== EMPTY) {
        const cx = c * CELL + CELL / 2;
        const cy = r * CELL + CELL / 2;
        const radius = CELL / 2 - 4;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = board[r][c] === BLACK ? "#1a1a1a" : "#f0f0f0";
        ctx.fill();
        ctx.strokeStyle = board[r][c] === BLACK ? "#000" : "#ccc";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  // Valid move indicators
  for (const [r, c] of validMoves) {
    const cx = c * CELL + CELL / 2;
    const cy = r * CELL + CELL / 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fill();
  }

  // Score
  const counts = countPieces(board);
  scoreEl.textContent = `Black: ${counts.black} | White: ${counts.white}`;
}

// ---- Game Flow ----

function colorName(c: Cell): string {
  return c === BLACK ? "Black" : "White";
}

function checkGameEnd(): boolean {
  const playerMoves = getValidMoves(board, playerColor);
  const aiMoves = getValidMoves(board, aiColor);
  if (playerMoves.length === 0 && aiMoves.length === 0) {
    gameOver = true;
    const counts = countPieces(board);
    const playerCount = playerColor === BLACK ? counts.black : counts.white;
    const aiCount = playerColor === BLACK ? counts.white : counts.black;
    if (playerCount > aiCount) statusEl.textContent = `You win! ${playerCount}-${aiCount}`;
    else if (aiCount > playerCount) statusEl.textContent = `Computer wins. ${aiCount}-${playerCount}`;
    else statusEl.textContent = `Draw! ${playerCount}-${aiCount}`;
    draw();
    return true;
  }
  return false;
}

function handlePlayerTurn(): void {
  if (gameOver) return;
  const moves = getValidMoves(board, playerColor);
  if (moves.length === 0) {
    statusEl.textContent = "No valid moves - passed";
    currentTurn = aiColor;
    draw();
    setTimeout(handleAiTurn, 500);
    return;
  }
  statusEl.textContent = `Your turn (${colorName(playerColor)})`;
  draw();
}

function handleAiTurn(): void {
  if (gameOver) return;
  const moves = getValidMoves(board, aiColor);
  if (moves.length === 0) {
    statusEl.textContent = "Computer has no moves - passed";
    currentTurn = playerColor;
    draw();
    setTimeout(handlePlayerTurn, 500);
    return;
  }
  aiThinking = true;
  statusEl.textContent = "Thinking...";
  draw();
  worker.postMessage({
    board,
    aiColor,
    depth: parseInt(depthEl.value) || 4,
  });
}

worker.onmessage = (e: MessageEvent<{ move: Pos | null }>) => {
  const { move } = e.data;
  if (move) {
    board = makeMove(board, move[0], move[1], aiColor);
  }
  aiThinking = false;
  currentTurn = playerColor;
  if (!checkGameEnd()) {
    handlePlayerTurn();
  }
};

// ---- Events ----

canvas.addEventListener("click", (e: MouseEvent) => {
  if (gameOver || aiThinking || currentTurn !== playerColor) return;
  const rect = canvas.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * BOARD_PX;
  const y = ((e.clientY - rect.top) / rect.height) * BOARD_PX;
  const col = Math.floor(x / CELL);
  const row = Math.floor(y / CELL);
  if (row < 0 || row >= SIZE || col < 0 || col >= SIZE) return;
  if (getFlips(board, row, col, playerColor).length === 0) return;

  board = makeMove(board, row, col, playerColor);
  currentTurn = aiColor;
  if (!checkGameEnd()) {
    handleAiTurn();
  }
});

canvas.addEventListener("mousemove", (e: MouseEvent) => {
  if (gameOver || aiThinking || currentTurn !== playerColor) {
    canvas.style.cursor = "default";
    return;
  }
  const rect = canvas.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * BOARD_PX;
  const y = ((e.clientY - rect.top) / rect.height) * BOARD_PX;
  const col = Math.floor(x / CELL);
  const row = Math.floor(y / CELL);
  if (row >= 0 && row < SIZE && col >= 0 && col < SIZE && getFlips(board, row, col, playerColor).length > 0) {
    canvas.style.cursor = "pointer";
  } else {
    canvas.style.cursor = "default";
  }
});

newGameEl.addEventListener("click", () => {
  playerGoesFirst = !playerGoesFirst;
  board = createBoard();
  playerColor = playerGoesFirst ? BLACK : WHITE;
  aiColor = playerGoesFirst ? WHITE : BLACK;
  currentTurn = BLACK;
  gameOver = false;
  aiThinking = false;
  if (currentTurn === aiColor) {
    handleAiTurn();
  } else {
    handlePlayerTurn();
  }
});

// ---- Init ----

board = createBoard();
handlePlayerTurn();
