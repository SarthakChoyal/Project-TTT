// JavaScript code for the game
const refreshButton = document.getElementById('refresh-button');

const board = Array(9).fill(null);
let player = "X";
let gameover = false;

const cells = document.querySelectorAll(".board-cell");
const message = document.getElementById("message");

function updateBoard(cellIndex) {
  board[cellIndex] = player;
  cells[cellIndex].textContent = player;
}

function checkWinner() {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function resetBoard() {
  board.fill(null);
  cells.forEach((cell) => (cell.textContent = ""));
  player = "X";
  gameover = false;
  message.textContent = "";
}

function handleClick(event) {
  const cellIndex = parseInt(event.target.id);
  if (board[cellIndex] !== null || gameover) {
    return;
  }
  updateBoard(cellIndex);
  const winner = checkWinner();
  if (winner) {
    message.textContent = `Player ${winner} wins!`;
    gameover = true;
  } else if (board.every((cell) => cell !== null)) {
    message.textContent = "It's a tie!";
    gameover = true;
  } else {
    player = player === "X" ? "O" : "X";
    message.textContent = `Player ${player}'s turn`;
  }
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));
document.getElementById("reset-button").addEventListener("click", resetBoard);

// Add a click event listener to the refresh button
refreshButton.addEventListener('click', function() {
  // Reload the page to reset the game
  location.reload();
});