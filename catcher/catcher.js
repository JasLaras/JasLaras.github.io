// Get references to HTML elements
const gameContainer = document.getElementById('game-container');
const basket = document.getElementById('basket');
const counterSpan = document.getElementById('counter'); // Reference to the span element inside the counter div

// Initialize variables
let basketX = (gameContainer.offsetWidth - basket.offsetWidth) / 2; // Initial basket position
let basketSpeed = 20; // Increased basket speed
let fruitsCollected = 0; // Counter for fruits collected

// Event listener for arrow key presses to move the basket
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        const newX = basketX - basketSpeed;
        if (newX >= 0) {
          basketX = newX;
        }
    } else if (event.key === 'ArrowRight') {
        const newX = basketX + basketSpeed;
        const maxBasketX = gameContainer.offsetWidth - basket.offsetWidth; 
        if (newX <= maxBasketX) {
          basketX = newX;
        }
    }
    
    basket.style.left = `${basketX}px`; // Set position in pixels
});

// Function to update the counter display with the current fruits collected count
function updateCounter() {
    counterSpan.textContent = fruitsCollected;
}

// Function to spawn a fruit
function spawnFruit() {
    const fruit = document.createElement('img');
    fruit.classList.add('fruit');

    // Array of fruit images
    const fruitImages = ['banana.png', 'orange.png', 'grape.png', 'apple.png']; 
    const randomFruitImage = fruitImages[Math.floor(Math.random() * fruitImages.length)];
    fruit.src = randomFruitImage;

    let fruitX = Math.random() * (gameContainer.offsetWidth - 50);
    fruit.style.left = `${fruitX}px`; // Set initial horizontal position
    fruit.style.top = '0'; // Set initial vertical position
    fruit.style.position = 'absolute';
    gameContainer.appendChild(fruit);
  
    let fruitY = 0;
    const fruitSpeed = 5; // Speed at which fruit falls
  
    // Function to move the fruit downwards
    function moveFruit() {
        fruitY += fruitSpeed;
        fruit.style.top = `${fruitY}px`; // Set position in pixels
  
        // Remove fruit if it reaches bottom of container
        if (fruitY >= gameContainer.offsetHeight) {
            clearInterval(fruitInterval);
            gameContainer.removeChild(fruit);
        }
  
        // Check collision with basket
        const basketLeft = basket.offsetLeft;
        const basketRight = basket.offsetLeft + basket.offsetWidth;
        const basketTop = basket.offsetTop;
        const basketBottom = basket.offsetTop + basket.offsetHeight;

        const fruitLeft = fruit.offsetLeft;
        const fruitRight = fruit.offsetLeft + fruit.offsetWidth;
        const fruitTop = fruit.offsetTop;
        const fruitBottom = fruit.offsetTop + fruit.offsetHeight;
  
        // If fruit collides with basket, remove fruit and increment counter
        if (
            fruitBottom >= basketTop &&
            fruitTop <= basketBottom &&
            fruitRight >= basketLeft &&
            fruitLeft <= basketRight
        ) {
            clearInterval(fruitInterval);
            gameContainer.removeChild(fruit);
            fruitsCollected++;
            updateCounter(); // Update counter when fruit is collected
        }
    }
  
    const fruitInterval = setInterval(moveFruit, 50); // Decreased interval for slower spawn rate
}
  
setInterval(spawnFruit, 1500); // Decreased interval between spawns
