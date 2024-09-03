# **Connect Four Game**

## Overview
This Connect Four game allows two players to compete against each other in a classic game of Connect Four. Players take turns placing pieces in a grid, aiming to connect four pieces horizontally, vertically, or diagonally. The game features a simple user interface with options to start a new game, reset the board, and display a winner overlay when someone wins.

[Click here to view a demo of my game](https://tem-tech.github.io/typescript-game/)
## Project Plan
1. Setup Game Environment

- Create a 7x6 grid for the game board.
- Implement the initial setup with start and reset buttons.
2. Game Functionality

- Allow players to place pieces in the grid.
- Switch turns between players.
- Detect winning conditions (horizontal, vertical, diagonal).
- Display the winner and provide options for a new game or reset.
3. User Interface

- Design a responsive layout for different screen sizes.
- Animate piece placement and winning conditions.
- Provide visual feedback for player actions and game status.
4. Additional Features

Implement media queries for responsiveness.
Add sound effects for piece placement and winning.
Optionally, implement a computer vs. player mode.
## Features
1. Game Initialization

- Start the game with a start button.
- Dynamically generate the game board.
- Hide the start button after the game starts.
2. Piece Placement

- Click on a column to place a piece.
- Pieces will slide down and grow in size to their final position.
  
3. Winning Conditions

- Check for horizontal, vertical, and diagonal connections of four.
- Display a winner overlay with the winning player's color.
  
4. Game Reset

- Provide a reset button to restart the game.
- Ask for confirmation before resetting the game if it is not empty.
- Show a confirmation prompt before resetting.
  
5. Responsive Design

- Ensure the game is responsive across various devices.
- Adjust game board size and layout based on screen width.
  
6. Animations

- Animate pieces as they are placed on the board.
- Use CSS animations for piece placement and winning announcements.
7. User Feedback

- Display messages for invalid moves (e.g., full column).
- Highlight the current player's turn.
8. Sound Effects (Optional)

- Add sound effects for piece placement and game events.
9. Computer vs. Player Mode (Optional)

- Implement an AI to play against a human player.
  
## Getting Started
1. Clone the Repository

`bash
Copy code
git clone <repository-url>
cd <repository-directory>`


2. Open the Project

- Open index.html in a web browser to start playing.
3. Customize and Extend

- Modify styles in styles.scss for custom looks.
- Add or change functionality in the game.ts file.
  
## Development
- CSS/SCSS: styles.scss
- JavaScript/TypeScript: game.ts
## Contributing
Feel free to submit pull requests or open issues for any bugs or feature requests. Contributions are welcome!
