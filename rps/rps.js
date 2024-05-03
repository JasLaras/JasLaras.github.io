/*SOURCE CODE (MIT LICENSE): https://github.com/dpatlut/GA-Rock-Paper-Scissors/tree/student */

////////////////////////////////////////////////
/*   Provided Code - Please Don't Edit   */
////////////////////////////////////////////////

'use strict';

/* function getInput() {
    console.log("Please choose either 'rock', 'paper', or 'scissors'.")
        return prompt();
} */
function randomPlay() {
    var randomNumber = Math.random();
    if (randomNumber < 0.33) {
        return "rock";
    } else if (randomNumber < 0.66) {
        return "paper";
    } else {
        return "scissors";
    }
}

////////////////////////////////////////////////
/*           Write Your Code Below            */
////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    // Selecting necessary DOM elements
    const gameArea = document.querySelector('.game-area');
    const playerScoreDisplay = document.getElementById('player-score');
    const computerScoreDisplay = document.getElementById('computer-score');
    const resultDisplay = document.getElementById('result');

    // Initializing variables to track player and computer wins
    let playerWins = 0;
    let computerWins = 0;

    // Adding event listener to the game area for click events
    gameArea.addEventListener('click', function (event) {
        // Checking if the clicked element is a button with the 'move' class
        if (event.target.matches('.move')) {
            // Getting the player's move from the clicked button's data attribute
            const playerMove = event.target.dataset.move;
            // Generating the computer's move
            const computerMove = randomPlay();
            // Determining the winner of the round
            const winner = getWinner(playerMove, computerMove);

            // Updating scores and result display based on the winner
            if (winner === "player") {
                playerWins++;
                playerScoreDisplay.textContent = playerWins;
                resultDisplay.textContent = `Player wins ${playerMove} beats ${computerMove}`;
            } else if (winner === "computer") {
                computerWins++;
                computerScoreDisplay.textContent = computerWins;
                resultDisplay.textContent = `Computer wins ${computerMove} beats ${playerMove}`;
            } else if (winner === "tie") {
                resultDisplay.textContent = "Both moves were the same. The result is a Tie and no points awarded to any player";
            }

            // Checking if either player has reached 5 wins
            if (playerWins === 5 || computerWins === 5) {
                resultDisplay.textContent = `Final score is ${playerWins} - Player ${computerWins} - Computer`;
            }
        }
    });
});

// Function to determine the move based on the player (user or computer)
function getMove(player) {
    // Returns the move based on the player (user or computer)
    return player ? getInput() : randomPlay();
}

// Function to determine the winner of a round
function getWinner(playerMove, computerMove) {
    // Checking for a tie
    if (playerMove === computerMove) {
        return 'tie';
    } 
    // Checking for other win scenarios
    else if ((playerMove === 'rock' && computerMove === 'scissors') ||
             (playerMove === 'scissors' && computerMove === 'paper') ||
             (playerMove === 'paper' && computerMove === 'rock')) {
        return 'player';
    } 
    // If not a tie or player win, computer wins
    else {
        return 'computer';
    }
}

// Function to play a single round of the game
function playRound(playerMove, computerMove) {
    // Determining the winner of the round
    const winner = getWinner(playerMove, computerMove);
    // Returning the winner and the result message
    if (winner === "player") {
        return { winner: "Player", message: `${playerMove} beats ${computerMove}` };
    } else if (winner === "computer") {
        return { winner: "Computer", message: `${computerMove} beats ${playerMove}` };
    } else {
        return { winner: "Tie", message: "Both moves were the same. It's a tie." };
    }
}

// Function to play the game until one player reaches 5 wins
function playToFive() {
    console.log("Let's play Rock, Paper, Scissors");
    let playerWins = 0;
    let computerWins = 0;

    // Playing rounds until one player reaches 5 wins
    while (playerWins < 5 && computerWins < 5) {
        // Getting moves for both player and computer
        const playerMove = getMove(true);
        const computerMove = getMove(false);
        // Playing a round and obtaining the result
        const result = playRound(playerMove, computerMove);

        // Logging the result of each round
        console.log(`${result.winner} wins! ${result.message}`);
        // Updating the scores based on the winner
        if (result.winner === "Player") {
            playerWins++;
        } else if (result.winner === "Computer") {
            computerWins++;
        }

        // Logging the current score
        console.log(`The score is Player: ${playerWins} - Computer: ${computerWins}`);
    }

    // Logging the final score
    console.log(`Final score: Player: ${playerWins} - Computer: ${computerWins}`);
    // Returning the final score as an array
    return [playerWins, computerWins];
}

// Starting the game
playToFive();


// Changes:
// 1. Added event listener to handle button clicks.
// 2. Removed getInput() function because of undesired behavior with console.log and bugged page alerts.
// 3. Added comments to clarify the purpose of the code.