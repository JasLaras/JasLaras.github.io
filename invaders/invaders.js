// Get references to the HTML elements
const startMessage = document.getElementById('start-message');
const playButton = document.getElementById('play-button');
const gameContainer = document.getElementById('game-container');
const winMessage = document.getElementById('win-message');
const playAgainButton = document.getElementById('play-again-button');
const gameOverMessage = document.getElementById('game-over-message');
const playAgainButtonGameOver = document.getElementById('play-again-button-game-over');

// Get the canvas element and its 2D context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Player settings
const playerWidth = 50;
const playerHeight = 50;
let playerX = canvas.width / 2 - playerWidth / 2; // Initial player position
const playerY = canvas.height - playerHeight - 10; // Player's fixed Y position
const playerImage = new Image(); // Image for the player
playerImage.src = 'shooter.png'; // Path to player image

// Invader settings
const invaderWidth = 50;
const invaderHeight = 50;
const invaderGap = 20; // Gap between invaders
const invaderRows = 4;
const invaderCols = 10;
let invaders = []; // Array to store invader positions
const invaderImage = new Image(); // Image for the invaders
invaderImage.src = 'invader1.png'; // Path to invader image
let invaderSpeed = 0.3; // Horizontal speed of invaders
let invaderDownSpeed = 0.2; // Vertical speed of invaders when they move down

// Bullet settings
const bulletWidth = 5;
const bulletHeight = 20;
let bullets = []; // Array to store bullet positions
let bulletSpeed = 10; // Speed of bullets
let bulletDelay = 0.2; // Delay between bullet shots in seconds
let lastBulletTime = 0; // Time of the last shot
let gameInterval; // Variable to store the game loop interval

// Function to start the game
function startGame() {
  startMessage.classList.add('hidden'); // Hide the start message
  gameContainer.classList.remove('hidden'); // Show the game container
  initGame(); // Start the game
}

// Event listener for the play button
playButton.addEventListener('click', startGame);

// Event listener for the play again button after winning
playAgainButton.addEventListener('click', () => {
  winMessage.classList.add('hidden'); // Hide the win message
  gameContainer.classList.remove('hidden'); // Show the game container
  initGame(); // Start the game again
});

// Event listener for the play again button after game over
playAgainButtonGameOver.addEventListener('click', () => {
  gameOverMessage.classList.add('hidden'); // Hide the game over message
  gameContainer.classList.remove('hidden'); // Show the game container
  initGame(); // Start the game again
});

// Event listener for keyboard input
document.addEventListener('keydown', event => {
  // If Enter key is pressed
  if (event.key === 'Enter') {
    // Check if the win message or game over message is visible
    if (!winMessage.classList.contains('hidden') || !gameOverMessage.classList.contains('hidden')) {
      // If either message is visible, hide them and start the game again
      winMessage.classList.add('hidden');
      gameOverMessage.classList.add('hidden');
      gameContainer.classList.remove('hidden');
      initGame(); // Start the game again
    } else if (!gameContainer.classList.contains('hidden') && startMessage.classList.contains('hidden')) {
      // If game is ongoing, simulate click on play again button
      playAgainButton.click();
    } else {
      // If game is not ongoing, simulate click on play button
      playButton.click();
    }
  }
});

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  updatePlayerPosition(); // Update the player position
  ctx.drawImage(playerImage, playerX, playerY, playerWidth, playerHeight); // Draw the player

  // Draw the invaders
  invaders.forEach(invader => {
    ctx.drawImage(invaderImage, invader.x, invader.y, invaderWidth, invaderHeight);
  });

  // Draw the bullets
  bullets.forEach(bullet => {
    ctx.fillStyle = 'white';
    ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
    bullet.y -= bulletSpeed; // Move the bullet upwards
  });

  // Remove bullets that go off-screen
  bullets = bullets.filter(bullet => bullet.y >= 0);

  // Move the invaders
  invaders.forEach(invader => {
    invader.x += invaderSpeed;
    invader.y += invaderDownSpeed; // Slowly move the invaders downwards
    // If an invader reaches the edge, reverse direction and move down
    if (invader.x + invaderWidth >= canvas.width || invader.x <= 0) {
      invaderSpeed *= -1;
      // Move all invaders down
      invaders.forEach(inv => (inv.y += invaderHeight));
    }
  });

  // Check for collisions between bullets and invaders
  bullets.forEach((bullet, bulletIndex) => {
    invaders.forEach((invader, invaderIndex) => {
      // If bullet hits an invader
      if (
        bullet.x >= invader.x &&
        bullet.x <= invader.x + invaderWidth &&
        bullet.y >= invader.y &&
        bullet.y <= invader.y + invaderHeight
      ) {
        // Remove the bullet and invader
        bullets.splice(bulletIndex, 1);
        invaders.splice(invaderIndex, 1);

        // Check if there are no more invaders
        if (invaders.length === 0) {
          // Hide the game container
          gameContainer.classList.add('hidden');
          // Show the win message
          winMessage.classList.remove('hidden');
          clearInterval(gameInterval); // Pause the game loop
        }

        // Exit the loop early
        return;
      }
    });
  });

  // Check for game over conditions
  if (invaders.length === 0) {
    winMessage.classList.remove('hidden'); // Show win message
    clearInterval(gameInterval); // Pause the game loop
  } else if (invaders.some(invader => invader.y + invaderHeight >= playerY)) {
    gameOverMessage.classList.remove('hidden'); // Show game over message
    clearInterval(gameInterval); // Pause the game loop
  }
}

// Initialize the game
function initGame() {
  // Create the invaders
  invaders = [];
  for (let row = 0; row < invaderRows; row++) {
    for (let col = 0; col < invaderCols; col++) {
      invaders.push({
        x: col * (invaderWidth + invaderGap) + invaderGap,
        y: row * (invaderHeight + invaderGap) + invaderGap
      });
    }
  }

  // Start the game loop
  gameInterval = setInterval(gameLoop, 1000 / 60); // 60 frames per second
}

// Handle player movement and shooting
let isLeftPressed = false;
let isRightPressed = false;

// Event listener for keydown events
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    isLeftPressed = true;
  } else if (event.key === 'ArrowRight') {
    isRightPressed = true;
  } else if (event.key === ' ') {
    // Space key for shooting
    const currentTime = performance.now();
    // Delay between shots
    if (currentTime - lastBulletTime >= bulletDelay * 1000) {
      // Add a new bullet at player's position
      bullets.push({ x: playerX + playerWidth / 2, y: playerY });
      lastBulletTime = currentTime; // Update last shot time
    }
  }
});

// Event listener for keyup events
document.addEventListener('keyup', event => {
  if (event.key === 'ArrowLeft') {
    isLeftPressed = false;
  } else if (event.key === 'ArrowRight') {
    isRightPressed = false;
  }
});

// Update player position in the game loop
function updatePlayerPosition() {
  if (isLeftPressed) {
    playerX -= 10;
  }
  if (isRightPressed) {
    playerX += 10;
  }
  // Ensure player stays within canvas bounds
  playerX = Math.max(0, Math.min(playerX, canvas.width - playerWidth));
}
