// Get references to the buttons and containers
const startMessage = document.getElementById('start-message');
const playButton = document.getElementById('play-button');
const gameContainer = document.getElementById('game-container');
const winMessage = document.getElementById('win-message');
const playAgainButton = document.getElementById('play-again-button');
const gameOverMessage = document.getElementById('game-over-message');
const playAgainButtonGameOver = document.getElementById('play-again-button-game-over');

// Get the canvas element
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Player settings
const playerWidth = 50;
const playerHeight = 50;
let playerX = canvas.width / 2 - playerWidth / 2;
const playerY = canvas.height - playerHeight - 10;
const playerImage = new Image();
playerImage.src = 'shooter.png';

// Invader settings
const invaderWidth = 50;
const invaderHeight = 50;
const invaderGap = 20;
const invaderRows = 4;
const invaderCols = 10;
let invaders = [];
const invaderImage = new Image();
invaderImage.src = 'invader1.png';
let invaderSpeed = 0.3;
let invaderDownSpeed = 0.2; 

// Bullet settings
const bulletWidth = 5;
const bulletHeight = 20;
let bullets = [];
let bulletSpeed = 10;
let bulletDelay = 0.2; // Delay between bullet shots in seconds
let lastBulletTime = 0;
let gameInterval; // variable to store game loop interval

// Function to start the game
function startGame() {
  startMessage.classList.add('hidden'); // Hide the start message
  gameContainer.classList.remove('hidden'); // Show the game container
  initGame(); // Start the game
}

// Event listener for the play button
playButton.addEventListener('click', startGame);

// Event listener for the play again button
playAgainButton.addEventListener('click', () => {
  winMessage.classList.add('hidden'); // Hide the win message
  gameContainer.classList.remove('hidden'); // Show the game container
  initGame(); // Start the game again
});

playAgainButtonGameOver.addEventListener('click', () => {
    gameOverMessage.classList.add('hidden'); // Hide the game over message
    gameContainer.classList.remove('hidden'); // Show the game container
    initGame(); // Start the game again
});

// Game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update the player position
  updatePlayerPosition();

  // Draw the player
  ctx.drawImage(playerImage, playerX, playerY, playerWidth, playerHeight);

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
    if (invader.x + invaderWidth >= canvas.width || invader.x <= 0) {
      invaderSpeed *= -1;
      invaders.forEach(inv => (inv.y += invaderHeight));
    }
  });

  // Check for collisions between bullets and invaders
  bullets.forEach((bullet, bulletIndex) => {
    invaders.forEach((invader, invaderIndex) => {
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

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    isLeftPressed = true;
  } else if (event.key === 'ArrowRight') {
    isRightPressed = true;
  } else if (event.key === ' ') {
    const currentTime = performance.now();
    if (currentTime - lastBulletTime >= bulletDelay * 1000) {
      bullets.push({ x: playerX + playerWidth / 2, y: playerY });
      lastBulletTime = currentTime;
    }
  }
});

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
  playerX = Math.max(0, Math.min(playerX, canvas.width - playerWidth));
}
