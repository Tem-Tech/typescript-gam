const player1: string = "P";
const player2: string = "B";
let currentPlayer: string = player1;
let gameOver: boolean = false;
let board: string[][];
const rows: number = 6;
const columns: number = 7;
const startButton: HTMLButtonElement | null = document.getElementById("start") as HTMLButtonElement;
let resetButton: HTMLButtonElement | null = null; 


// Click button to start game and display board
startButton?.addEventListener("click", setGame);

// Set the board as an empty array
function setGame(): void {
  // Clear the existing board if any
  const existingBoard = document.getElementById("board");
  if (existingBoard) {
    existingBoard.remove();
  }
     // Hide the Start Game button
     if (startButton) {
      startButton.style.display = "none";
  }

  const game = document.createElement("div");
  game.id = "board";
  document.body.appendChild(game);

  board = [];

  // Create a new row array for each iteration
  for (let r = 0; r < rows; r++) {
    let row: string[] = [];
    for (let c = 0; c < columns; c++) {
      // Create each cell in the row with an empty space
      row.push(' ');
      // Create a new tile (div) for each cell
      const tile = document.createElement("div");
      // Set the ID for the tile using the current row and column indices
      tile.id = r.toString() + "-" + c.toString();
      // Display tiles
      tile.classList.add("tile");
      // Add player pieces to tile when clicked
      tile.addEventListener("click", setPiece);
      // Fix the tiles to the board 
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

  // Get the clicked tile using event.target
  const tile = event.target as HTMLElement;

  // Make sure the clicked tile has an ID to avoid errors
  if (!tile.id) return;

  // Split the tile ID to get the row and column indices as numbers not strings
  const coordinates = tile.id.split("-");
  const c: number = parseInt(coordinates[1], 10);
  //start searching from the bottom row
  let r: number = rows - 1;
  //if the cell is occupied move up to place the piece
  while (r >= 0 && board[r][c] !== ' ') { r--; }
  //if the column is full alert player
  if (r < 0) {
    alert("No room in the inn! Choose somewhere else..");
    return;
  }
  board[r][c] = currentPlayer;
  const fillTile = document.getElementById(r.toString() + "-" + c.toString());
  if (fillTile) { if (currentPlayer === player1) { fillTile.classList.add("redPiece"); } else { fillTile.classList.add("yellowPiece"); } }
  
      // Display the Reset button after the first piece is placed and not with an empty board
      if (!resetButton) {
        resetButton = document.createElement("button");
        resetButton.textContent = "Reset Game";
        resetButton.className = "button";
        resetButton.addEventListener("click", resetGame);
        document.body.appendChild(resetButton);
    }
  // Switch the current player after each piece is set
  currentPlayer = (currentPlayer === player1) ? player2 : player1;
}
//prevent user being able to reset board if empty
function resetGame(): void {
  if (isBoardEmpty()) {
      return; 
  }

  gameOver = false;
  currentPlayer = player1;

  // Remove the pieces from the board
  const boardElement = document.getElementById("board");
  if (boardElement) {
      boardElement.remove();
  }

  // Hide the Reset button after resetting
  if (resetButton) {
      resetButton.remove();
      resetButton = null; 
  }

  setGame();
}
// Check whether or not the board is empty before allowing reset button
function isBoardEmpty(): boolean {
  for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
          if (board[r][c] !== ' ') {
              return false; 
          }
      }
  }
  return true; 
}
// Check if a player has won after each move.
// If the game is over, display a message and reset the board.
