"use strict";
const gameMusic = document.getElementById("gameSound");
const playSound = document.getElementById("playSound");
const player1 = "P";
const player2 = "B";
let currentPlayer = player1;
let gameOver = false;
let board;
const rows = 6;
const columns = 7;
const startButton = document.getElementById("start");
let resetButton = null;
//start playing game song on load and if the browser i s refreshed by using sessionStorage to store and update the music state
window.onload = () => {
    playSong();
    const isMusicPlaying = sessionStorage.getItem("isMusicPlaying");
    if (isMusicPlaying === "true" && gameMusic) {
        gameMusic.play();
    }
};
function playSong() {
    if (gameMusic) {
        gameMusic.loop = true;
        gameMusic.play();
        // Store music playing state in sessionStorage
        sessionStorage.setItem("isMusicPlaying", "true");
    }
}
// Event listener to update the state when the page is unloaded
window.onbeforeunload = () => {
    if (gameMusic) {
        sessionStorage.setItem("isMusicPlaying", gameMusic.paused ? "false" : "true");
    }
};
// Click button to start game and display board
startButton?.addEventListener("click", setGame);
// Set the board as an empty array
function setGame() {
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
        let row = [];
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
            tile.addEventListener("click", pieceSound);
            // Fix the tiles to the board 
            game.appendChild(tile);
        }
        // Add the created row to the board array
        board.push(row);
    }
}
function pieceSound() {
    if (playSound) {
        playSound.play();
    }
}
function setPiece(event) {
    if (gameOver) {
        return;
    }
    // Get the clicked tile using event.target
    const tile = event.target;
    // Make sure the clicked tile has an ID to avoid errors
    if (!tile.id)
        return;
    // Split the tile ID to get the row and column indices as numbers not strings
    const coordinates = tile.id.split("-");
    const c = parseInt(coordinates[1], 10);
    // Start searching from the bottom row
    let r = rows - 1;
    // If the cell is occupied move up to place the piece
    while (r >= 0 && board[r][c] !== ' ') {
        r--;
    }
    // If the column is full alert player
    if (r < 0) {
        alert("No room in the inn! Choose somewhere else..");
        return;
    }
    board[r][c] = currentPlayer;
    const fillTile = document.getElementById(r.toString() + "-" + c.toString());
    if (fillTile) {
        if (currentPlayer === player1) {
            fillTile.classList.add("redPiece");
        }
        else {
            fillTile.classList.add("yellowPiece");
        }
    }
    // Display the Reset button after the first piece is placed
    if (!resetButton) {
        resetButton = document.createElement("button");
        resetButton.textContent = "Reset Game";
        resetButton.className = "button";
        resetButton.addEventListener("click", confirmReset);
        document.body.appendChild(resetButton);
    }
    // Switch the current player after each piece is set
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
    checkWinner();
}
function checkWinner() {
    // Check for horizontal wins
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != " ") {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c);
                    gameOver = true;
                    return;
                }
            }
        }
    }
    // Check for vertical wins
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != " ") {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
                    setWinner(r, c);
                    gameOver = true;
                    return;
                }
            }
        }
    }
    // Check for diagonal wins
    // Top to bottom, left to right 
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != " ") {
                if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    setWinner(r, c);
                    gameOver = true;
                    return;
                }
            }
        }
    }
    // Bottom to top left to right
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != " ") {
                if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}
function setWinner(r, c) {
    const winnerOverlay = document.getElementById("winnerOverlay");
    const winnerMessage = document.getElementById("winnerMessage");
    const newGameButton = document.getElementById("newGameButton");
    const homeButton = document.getElementById("homeButton");
    if (!winnerOverlay || !winnerMessage || !newGameButton || !homeButton)
        return;
    // Display the winner message
    if (board[r][c] === player1) {
        winnerMessage.innerHTML = "Red wins!";
    }
    else {
        winnerMessage.innerHTML = "Yellow wins!";
    }
    // Show the overlay
    winnerOverlay.classList.remove("overlay--hidden");
    gameOver = true;
    // Add an event listener to the "New Game" button
    newGameButton.addEventListener("click", newGame);
    homeButton.addEventListener("click", reloadPage);
}
// Function to reset the game
function newGame() {
    // Hide the overlay
    const winnerOverlay = document.getElementById("winnerOverlay");
    if (winnerOverlay) {
        winnerOverlay.classList.add("overlay--hidden");
    }
    // Clear the board and reset variables
    const gameBoard = document.getElementById("board");
    if (gameBoard) {
        gameBoard.remove();
    }
    board = [];
    gameOver = false;
    currentPlayer = player1;
    // Remove the reset button
    if (resetButton) {
        resetButton.remove();
        resetButton = null;
    }
    // Re-initialize the game board
    setGame();
}
function reloadPage() {
    location.reload();
}
// Create a prompt asking for confirmation to reset and remove after reset
function confirmReset() {
    const confirmationBox = document.createElement("div");
    confirmationBox.id = "confirmationBox";
    const confirmationText = document.createElement("p");
    confirmationText.textContent = "Type 'confirm' to confirm reset:";
    const inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.id = "confirmationInput";
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm";
    confirmButton.className = "button";
    confirmButton.addEventListener("click", function () {
        if (inputBox.value.toLowerCase() === "confirm") {
            resetGame();
            confirmationBox.remove();
        }
        else {
            alert("Reset canceled. Type 'confirm' to confirm.");
        }
    });
    confirmationBox.appendChild(confirmationText);
    confirmationBox.appendChild(inputBox);
    confirmationBox.appendChild(confirmButton);
    document.body.appendChild(confirmationBox);
}
// Prevent user from resetting board if empty
function resetGame() {
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
function isBoardEmpty() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] !== ' ') {
                return false;
            }
        }
    }
    return true;
}
// If the game is over, display a message and reset the board.
//style alerts
//style all buttons except start button
// add computer or 2 player mode
// add reminder for a player if taking too long
//current player display
//sound effects for placing 
