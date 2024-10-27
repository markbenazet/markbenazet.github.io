let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');


function makeMove(cell) {
  if (cell.textContent === '' && currentPlayer === 'X') {
    cell.textContent = currentPlayer;
    if (checkWinner() !== null) {
      endGame();
    } else {
      currentPlayer = 'O';
      aiMakeMove();
    }
  }
}

function aiMakeMove() {
  setTimeout(function() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].textContent === '') {
        cells[i].textContent = currentPlayer;
        let score = minimax(cells, 0, false);
        cells[i].textContent = '';
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    cells[move].textContent = currentPlayer;
    if (checkWinner() !== null) {
      endGame();
    } else {
      currentPlayer = 'X';
    }
  }, 500); // Wait for 1000 milliseconds (1 second) before making the AI move
}

function minimax(board, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    return scores[result] - depth;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i].textContent === '') {
        board[i].textContent = 'O';
        let score = minimax(board, depth + 1, false);
        board[i].textContent = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i].textContent === '') {
        board[i].textContent = 'X';
        let score = minimax(board, depth + 1, true);
        board[i].textContent = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function endGame() {
    let winner = checkWinner();
    if (winner === 'tie') {
      displayWinner('Draw!');
    } else {
      displayWinner(winner + ' wins!');
    }
    // Don't hide the game board here
}


function isDraw() {
  return Array.from(cells).every(cell => cell.textContent !== '');
}

function displayWinner(message) {
    // Hide the game board
    document.getElementById('gameBoard').style.display = 'none';

    // Create the overlay with the winner message
    const overlay = document.createElement('div');
    overlay.classList.add('winner-overlay');
    overlay.innerHTML = `
        <div class="winner-message">
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(overlay);

    // Set up the event listener for the overlay
    overlay.addEventListener('click', function() {
        overlay.remove(); // Remove the overlay
        resetGame(); // Reset the game
    });
}


  

  function closeWinnerMessage() {
    document.getElementById('winnerMessage').style.display = 'none';
    resetGame();
  }
  

function checkWinner() {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combination of winCombinations) {
    const [a, b, c] = combination;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      return cells[a].textContent;
    }
  }

  if (isDraw()) {
    return 'tie';
  }
  return null;
}

function resetGame() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    // Show the game board
    document.getElementById('gameBoard').style.display = 'grid';
}


  
  

const scores = {
  'X': -10,
  'O': 10,
  'tie': 0
};




