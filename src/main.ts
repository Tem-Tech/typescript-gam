const player1: string = "P";
const player2: string = "B";
let currentPlayer: string = player1;
let gameOver: boolean = false;
let board: string[][]; 
const rows: number = 6;
const columns: number = 7;
const start: HTMLButtonElement | null = document.getElementById("start") as HTMLButtonElement;

// Click button to start game and display board
start?.addEventListener("click", setGame);

// Initialize the board as an empty array
function setGame(): void {
  // Clear the existing board if any
  const existingBoard = document.getElementById("board");
  if (existingBoard) {
    existingBoard.remove();
  }

  const game = document.createElement("div");
  game.id = "board";
  document.body.appendChild(game);

  board = [];

  // Create a new row array for each iteration
  for (let r = 0; r < rows; r++) {
    let row: string[] = [];
    for (let c = 0; c < columns; c++) {
      // Initialize each cell in the row with an empty space
      row.push(' ');
      // Create a new tile (div) for each cell
      const tile = document.createElement("div");
      // Set the ID for the tile using the current row and column indices
      tile.id = r.toString() + "-" + c.toString();
      // Display tiles
      tile.classList.add("tile");
      // Add player pieces to tile when clicked
      tile.addEventListener("click", setPiece);
      // Fix the tiles to the board element in the DOM if it exists
      game.appendChild(tile);
    }
    // Add the created row to the board array
    board.push(row);
  }
}

function setPiece(event: MouseEvent): void {
  if (gameOver) {
    return;
  }

  // Get the clicked element (tile) using event.target
  const tile = event.target as HTMLElement;

  // Ensure that the clicked element has an ID to avoid errors
  if (!tile.id) return;

  // Split the ID to get the row and column indices
  const coordinates = tile.id.split("-");
  const r: number = parseInt(coordinates[0], 10);
  const c: number = parseInt(coordinates[1], 10);

  // Add error handling for cases where the tile is already occupied
  if (board[r][c] !== ' ') {
    alert("This spot is already taken. Choose another one.");
    return;
  }

  // Update the board state
  board[r][c] = currentPlayer;

  // Set the class for the tile based on the current player
  if (currentPlayer === player1) {
    tile.classList.add("redPiece");
  } else {
    tile.classList.add("yellowPiece");
  }

  // Switch the current player
  currentPlayer = (currentPlayer === player1) ? player2 : player1;
}

// Check if a player has won after each move.
// If the game is over, you may want to display a message and reset the board.
