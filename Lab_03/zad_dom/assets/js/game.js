const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 854;
canvas.height = 480;

let score = 0;
let lives = 3;
let zombies = [];
let gameOver = false;
let gameOverAudio = new Audio('assets/audio/sad-music.mp3'); // Initialize the audio object

const fullHeartImg = new Image();
fullHeartImg.src = 'assets/img/full_heart.png';

const emptyHeartImg = new Image();
emptyHeartImg.src = 'assets/img/empty_heart.png';

const aimImage = new Image();
aimImage.src = 'assets/img/aim.png';

const zombieImage = new Image();
zombieImage.src = 'assets/img/walkingdead.png';

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
});

function formatScore(score) {
  const absScore = Math.abs(score).toString().padStart(5, '0');
  return score < 0 ? `-${absScore}` : absScore;
}

function updateUI() {
  document.querySelector('.score').innerText = formatScore(score);
  
  const livesContainer = document.querySelector('.lives');
  livesContainer.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    const heartImg = document.createElement('img');
    heartImg.src = i < lives ? fullHeartImg.src : emptyHeartImg.src;
    heartImg.style.width = '60px';
    heartImg.style.height = '60px';
    livesContainer.appendChild(heartImg);
  }
}

class Zombie {
  constructor() {
    this.x = canvas.width; // Starts on the right side
    this.y = Math.random() * 10 + 300;
    this.size = Math.random() * 0.2 + 0.4; // Random scale (0.4 - 0.6)
    this.speed = Math.random() * 2 + 1; // Random speed (1 - 3)
    this.frame = 0;
    this.frameCount = 10;
    this.frameWidth = 200;
    this.frameHeight = 312;
    this.frameDelay = 5;
    this.frameDelayCounter = 0;
  }
  
  draw() {
    ctx.drawImage(
      zombieImage,
      this.frame * this.frameWidth, 0,
      this.frameWidth, this.frameHeight,
      this.x, this.y,
      this.frameWidth * this.size, this.frameHeight * this.size
    );
  }
  
  update() {
    this.x -= this.speed;
    this.frameDelayCounter++;
    if (this.frameDelayCounter >= this.frameDelay) {
      this.frame = (this.frame + 1) % this.frameCount;
      this.frameDelayCounter = 0;
    }
  }
}

function gameLoop() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  zombies.forEach((zombie, index) => {
    zombie.update();
    zombie.draw();

    if (zombie.x < 0) {
      lives--;
      zombies.splice(index, 1); // Remove zombie
      if (lives <= 0) {
        endGame();
      }
    }
  });

  if (Math.random() < 0.015) { // Spawn frequency
    zombies.push(new Zombie());
  }

  const aimSize = 150;
  ctx.drawImage(aimImage, mouseX - aimSize / 2, mouseY - aimSize / 2, aimSize, aimSize);

  updateUI();
  requestAnimationFrame(gameLoop);
}

gameLoop();

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  let hit = false;
  zombies.forEach((zombie, index) => {
    const zombieWidth = zombie.frameWidth * zombie.size;
    const zombieHeight = zombie.frameHeight * zombie.size;

    if (
      mouseX >= zombie.x &&
      mouseX <= zombie.x + zombieWidth &&
      mouseY >= zombie.y &&
      mouseY <= zombie.y + zombieHeight
    ) {
      score += 20;
      zombies.splice(index, 1); // Remove the hit zombie
      hit = true;
    }
  });

  if (!hit) {
    score -= 5; // Miss penalty
  }
});

// Function to end the game and display the game over screen
function endGame() {
  gameOver = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.font = '48px Arial';
  ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
  ctx.font = '24px Arial';
  ctx.fillText('Click to Restart', canvas.width / 2 - 80, canvas.height / 2 + 50);

  // Play sad music
  gameOverAudio.play();

  // Restart game on click
  canvas.addEventListener('click', restartGame, { once: true });
}

// Function to restart the game
function restartGame() {
  if (gameOverAudio) {
    gameOverAudio.pause();
    gameOverAudio.currentTime = 0;
  }
  score = 0;
  lives = 3;
  zombies = [];
  gameOver = false;
  updateUI();
  gameLoop();
}