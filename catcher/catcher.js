const gameContainer = document.getElementById('game-container');
const basket = document.getElementById('basket');
const fruitCounter = document.createElement('div');
fruitCounter.classList.add('fruit-counter');
fruitCounter.textContent = 'Fruits Collected: 0';
gameContainer.appendChild(fruitCounter);

let basketX = 50; // In pixels
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
        const maxBasketX = gameContainer.offsetWidth - basket.offsetWidth; // In pixels
        if (newX <= maxBasketX) {
          basketX = newX;
        }
    }
    
    basket.style.left = `${basketX}px`; // Set position in pixels
});

function spawnFruit() {
    const fruit = document.createElement('div');
    fruit.classList.add('fruit');

    // Assign specific class based on fruit type
    const fruitTypes = ['banana', 'orange', 'grape', 'red']; // Include red as a fruit type
    const randomFruitType = fruitTypes[Math.floor(Math.random() * fruitTypes.length)];
    fruit.classList.add(randomFruitType);

    let fruitX = Math.random() * (gameContainer.offsetWidth - 50); // In pixels
    fruit.style.left = `${fruitX}px`; // Set position in pixels
    fruit.style.top = '0';
    fruit.style.position = 'absolute';
    gameContainer.appendChild(fruit);
  
    let fruitY = 0;
    const fruitSpeed = 5; // Increased fruit falling speed
  
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
            fruitCounter.textContent = `Fruits Collected: ${fruitsCollected}`;
        }
    }
  
    const fruitInterval = setInterval(moveFruit, 50); // Decreased interval for slower spawn rate
}
  
setInterval(spawnFruit, 1500); // Decreased interval between spawns