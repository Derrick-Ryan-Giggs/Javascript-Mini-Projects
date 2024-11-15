// Initialize game variables with data from local storage or default values
let board = JSON.parse(localStorage.getItem('board')) || ['', '', '', '', '', '', '', '', '']; // represents 9 cells in the Tic-Tac-Toe grid
let currentPlayer = localStorage.getItem('currentPlayer') || 'X';
let isGameActive = localStorage.getItem('isGameActive') === 'false' ? false : true;

// Define winning combinations
const winningCombinations = [ // holds all possible winning combinations
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Select HTML elements
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

// Set initial message
message.textContent = `Player ${currentPlayer}'s turn`;

// Restore the board state on page load
board.forEach((cellContent, index) => {
  cells[index].textContent = cellContent;
});

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Function handling click event in each cell
function handleCellClick(event) {
  const cell = event.target; // cell that was clicked
  const cellIndex = parseInt(cell.getAttribute("data-index")); // gets clicked cell position

  // Check if cell is empty and game is active
  if (board[cellIndex] !== '' || !isGameActive) {
    return;
  }

  // Update board and cell content
  board[cellIndex] = currentPlayer; // updates board array with current player
  cell.textContent = currentPlayer;

  // Store the updated board in local storage
  localStorage.setItem('board', JSON.stringify(board));

  // Check if current player has won
  checkWinner();
  checkDraw();

  // Switch player and update the message
  if (isGameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    localStorage.setItem('currentPlayer', currentPlayer);
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Checks if the current player has won
function checkWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i]; // destructure || unpack current winning combinations
    if (board[a] && board[a] === board[b] && board[a] === board[c]) { // checks if cell of current combination are filled with the same player
      // If we have a winner, display the message and end the game
      message.textContent = `${board[a]} wins!`; // display winner
      isGameActive = false; // end game || set game to inactive
      localStorage.setItem('isGameActive', isGameActive);
      return; // exits the function since the game is over
    }
  }
}

// Checks for a tie (if no empty cells are left)
function checkDraw() {
  if (!board.includes('') && isGameActive) {
    message.textContent = 'It\'s a tie!';
    isGameActive = false;
    localStorage.setItem('isGameActive', isGameActive);
  }
}

// Function that resets the game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', '']; // resets board to all empty strings
  currentPlayer = 'X'; // sets starting player
  isGameActive = true; // reactivates the game
  message.textContent = `Player ${currentPlayer}'s turn`; // clears message display
  cells.forEach(cell => cell.textContent = ''); // clears text content for all cells


  
  // Clear local storage 
  localStorage.removeItem('board', JSON.stringify(board));
  localStorage.removeItem('currentPlayer', currentPlayer);
  localStorage.removeItem('isGameActive', isGameActive);
}
