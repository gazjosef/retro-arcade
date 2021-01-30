const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');

const hero = {
  top: 700,
  left: 500
}

let missiles = []

let enemies = [
  { left: 200, top: 100 },
  { left: 300, top: 100 },
  { left: 400, top: 100 },
  { left: 500, top: 100 },
  { left: 600, top: 100 },
  { left: 700, top: 100 },
  { left: 800, top: 100 },
  { left: 900, top: 100 },
  { left: 200, top: 175 },
  { left: 300, top: 175 },
  { left: 400, top: 175 },
  { left: 500, top: 175 },
  { left: 600, top: 175 },
  { left: 700, top: 175 },
  { left: 800, top: 175 },
  { left: 900, top: 175 },
]

document.onkeydown = (e) => {
  if(e.keyCode === 37) {
      hero.left = hero.left - 10;
      moveHero()
  } else if (e.keyCode === 39) {
      hero.left = hero.left + 10;
      moveHero()   
  } else if(e.keyCode === 32) {
      missiles.push({
          left: hero.left + 15,
          top: hero.top
      })
      console.log(missiles);
      drawMissiles()
  }
}

function moveHero() {
  document.getElementById('hero').style.left = hero.left + "px"
}

function drawMissiles() {
  document.getElementById('missiles').innerHTML = '';
  for(let missile = 0; missile < missiles.length; missile++) {
      document.getElementById('missiles').innerHTML += `<div class='missile' style='left:${missiles[missile].left}px; top:${missiles[missile].top}px;'></div>`
  }
}

function moveMissiles() {
  for(let missile = 0; missile < missiles.length; missile++) {
      missiles[missile].top = missiles[missile].top - 5;
  }
}

function drawEnemies() {
  document.getElementById('enemies').innerHTML = '';
  for(let enemy = 0; enemy < enemies.length; enemy++) {
      document.getElementById('enemies').innerHTML += `<div class='enemy' style='left:${enemies[enemy].left}px; top:${enemies[enemy].top}px;'></div>`
  }   
}

function moveEnemies() {
  for(let enemy = 0; enemy < enemies.length; enemy++) {
      enemies[enemy].top = enemies[enemy].top + 3;
  }
}

function collisionDetection() {
  for(let enemy = 0; enemy < enemies.length; enemy++) {
      for(let missile = 0; missile < missiles.length; missile++) {
          if(
              (missiles[missile].top <= enemies[enemy].top + 50) &&
              (missiles[missile].top >= enemies[enemy].top) &&
              (missiles[missile].left >= enemies[enemy].left) &&
              (missiles[missile].left <= enemies[enemy].left + 50)
          ) {
              enemies.splice(enemy, 1);
              missiles.splice(missile, 1);
          }
      }
  }
}

function gameLoop() {
  setTimeout(gameLoop, 50);
  moveMissiles()
  drawMissiles()
  moveEnemies()
  drawEnemies()
  collisionDetection()
}
gameLoop()

// Bonus
// Move Hero Top/Down
// Move Enemies Left/Right as they move down.
// Add Score

// Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
