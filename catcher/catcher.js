const gameContainer = document.getElementById('game-container');
const basket = document.getElementById('basket');
const counterSpan = document.getElementById('counter'); // Reference to the span element inside the counter div

let basketX = (gameContainer.offsetWidth - basket.offsetWidth) / 2; 
let basketSpeed = 20; // Increased basket speed
let fruitsCollected = 0;

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

function updateCounter() {
    counterSpan.textContent = fruitsCollected; // Update  counter text with current fruits collected count
}

function spawnFruit() {
    const fruit = document.createElement('img');
    fruit.classList.add('fruit');

    const fruitImages = ['banana.png', 'orange.png', 'grape.png', 'apple.png']; 
    const randomFruitImage = fruitImages[Math.floor(Math.random() * fruitImages.length)];
    fruit.src = randomFruitImage;

    let fruitX = Math.random() * (gameContainer.offsetWidth - 50);
    fruit.style.left = `${fruitX}px`; 
    fruit.style.top = '0';
    fruit.style.position = 'absolute';
    gameContainer.appendChild(fruit);
  
    let fruitY = 0;
    const fruitSpeed = 5; 
  
    function moveFruit() {
        fruitY += fruitSpeed;
        fruit.style.top = `${fruitY}px`; // Set position in pixels
  
        if (fruitY >= gameContainer.offsetHeight) { // Check against container height
            clearInterval(fruitInterval);
            gameContainer.removeChild(fruit);
        }
  
        const basketLeft = basket.offsetLeft;
        const basketRight = basket.offsetLeft + basket.offsetWidth;
        const basketTop = basket.offsetTop;
        const basketBottom = basket.offsetTop + basket.offsetHeight;

        const fruitLeft = fruit.offsetLeft;
        const fruitRight = fruit.offsetLeft + fruit.offsetWidth;
        const fruitTop = fruit.offsetTop;
        const fruitBottom = fruit.offsetTop + fruit.offsetHeight;
  
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
