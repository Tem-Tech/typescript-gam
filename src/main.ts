const player1: string = "P";
const player2: string = "B";
let currentPlayer: string = player1;
let gameOver: boolean = false;
let board: string[][]; // Define the board as a 2D array of strings
const rows: number = 6;
const columns: number = 7;
var button: button = document.getElementById("start");


//click button to start game and display board
button?.addEventListener("click",setGame);
// Initialize the board as an empty array
function setGame(): void {
  const game = document.createElement("div");
  game.id = "board"
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
      //display tiles
      tile.classList.add("tile");
      // Append the tile to the board element in the DOM if it exists
      document.getElementById("board")?.append(tile);
    }
// Add the created row to the board array
    board.push(row); 
  }
}
