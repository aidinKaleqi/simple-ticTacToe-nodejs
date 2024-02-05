const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let currentPlayer = 'X';

function printBoard() {
  console.log('  0 1 2');
  for (let i = 0; i < 3; i++) {
    console.log(`${i} ${board[i].join(' ')}`);
  }
}

function checkWin() {
  // Check rows and columns
  for (let i = 0; i < 3; i++) {
    if ((board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== ' ') ||
        (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== ' ')) {
      return true;
    }
  }

  // Check diagonals
  if ((board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') ||
      (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ')) {
    return true;
  }

  return false;
}

function checkTie() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === ' ') {
        return false;
      }
    }
  }
  return true;
}

function switchPlayer() {
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

function makeMove(row, col) {
  if (row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col] === ' ') {
    board[row][col] = currentPlayer;
    return true;
  }
  return false;
}

function playGame() {
  printBoard();

  rl.question(`Player ${currentPlayer}, enter your move (row and column): `, (input) => {
    const [row, col] = input.split(' ').map(Number);

    if (makeMove(row, col)) {
      if (checkWin()) {
        printBoard();
        console.log(`Player ${currentPlayer} wins!`);
        rl.close();
      } else if (checkTie()) {
        printBoard();
        console.log('It\'s a tie!');
        rl.close();
      } else {
        switchPlayer();
        playGame();
      }
    } else {
      console.log('Invalid move. Try again.');
      playGame();
    }
  });
}

playGame();