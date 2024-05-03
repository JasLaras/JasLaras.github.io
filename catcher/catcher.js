const basket = document.getElementById('basket');
const fruitsContainer = document.getElementById('fruits');
let score = 0;

function randomFruit() {
  const fruits = ['apple', 'orange', 'banana'];
  return fruits[Math.floor(Math.random() * fruits.length)];
}

function createFruit() {
  const fruit = document.createElement('div');
  fruit.classList.add('fruit', randomFruit());
  fruit.style.left = `${Math.random() * 90}%`;
  fruitsContainer.appendChild(fruit);

  const fallInterval = setInterval(() => {
    const bottomPos = fruit.getBoundingClientRect().bottom;
    if (bottomPos > window.innerHeight) {
      clearInterval(fallInterval);
      fruitsContainer.removeChild(fruit);
    } else if (bottomPos > basket.getBoundingClientRect().top &&
               fruit.classList.contains('apple')) {
      clearInterval(fallInterval);
      fruitsContainer.removeChild(fruit);
      score += 1;
      updateScore();
    }
  }, 10);
}

function updateScore() {
  document.getElementById('score').innerText = `Score: ${score}`;
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    moveBasket(-20);
  } else if (event.key === 'ArrowRight') {
    moveBasket(20);
  }
});

function moveBasket(offset) {
  const leftPos = parseFloat(getComputedStyle(basket).left);
  const newLeftPos = leftPos + offset;
  const containerWidth = parseFloat(getComputedStyle(document.querySelector('.game-container')).width);
  const basketWidth = parseFloat(getComputedStyle(basket).width);

  if (newLeftPos >= 0 && newLeftPos <= containerWidth - basketWidth) {
    basket.style.left = `${newLeftPos}px`;
  }
}

setInterval(createFruit, 1000);
