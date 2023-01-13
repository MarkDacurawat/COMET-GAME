const character = document.querySelector(".character");
const enemy = document.querySelector(".enemy");
const game = document.querySelector(".game");
const startMenu = document.querySelector(".start-menu");
const startBtn = document.querySelector(".start");
const scoreOutput = document.querySelector(".score");
const highScore = document.querySelector(".highscore");

const player = {
  score: 0,
  highscore: 0,
};

window.onload = () => {
  const storedHighScore = localStorage.getItem("highScore");
  const score = localStorage.getItem("score");
  highScore.textContent = storedHighScore;

  if (!storedHighScore && !score) {
    localStorage.setItem("highScore", player.highscore);
    localStorage.setItem("score", player.score);
  }
};

const moveLeft = () => {
  let left = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  left -= 100;
  if (left >= 0) {
    character.style.left = `${left}px`;
  }
};

enemy.addEventListener("animationiteration", () => {
  const random = Math.floor(Math.random() * 3);
  left = random * 100;
  enemy.style.left = `${left}px`;
  player.score += 1;
  scoreOutput.textContent = player.score;
  highScore.textContent = localStorage.getItem("highScore");
  localStorage.setItem("score", player.score);
});

const moveRight = () => {
  let left = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  left += 100;
  if (left < 300) {
    character.style.left = `${left}px`;
  }
};

window.onkeydown = (e) => {
  if (e.key == "ArrowLeft") {
    moveLeft();
  }
  if (e.key == "ArrowRight") {
    moveRight();
  }
  if (game.classList.contains("hide") && e.code == "Space") {
    startFuntion();
  }
};

const checkCollision = () => {
  const characterLeft = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  const enemyLeft = parseInt(
    window.getComputedStyle(enemy).getPropertyValue("left")
  );
  const enemyTop = parseInt(
    window.getComputedStyle(enemy).getPropertyValue("top")
  );

  if (characterLeft == enemyLeft && enemyTop < 400 && enemyTop > 300) {
    enemy.style.top = "-100px";
    enemy.style.animation = "none";
    game.classList.add("hide");
    startMenu.classList.remove("hide");

    // Check Highscore
    const storedHighScore = parseInt(localStorage.getItem("highScore"));
    if (player.score > storedHighScore) {
      console.log("new highscore");
      localStorage.setItem("highScore", player.score);
      highScore.textContent = localStorage.getItem("highScore");
    }
    // Reset Score
    scoreOutput.textContent = 0;
    player.score = 0;
    localStorage.setItem("score", player.score);
    window.cancelAnimationFrame(checkCollision);
  }

  window.requestAnimationFrame(checkCollision);
};

startBtn.onclick = () => {
  startFuntion();
};

const startFuntion = () => {
  enemy.style.animation = "slide 0.8s infinite linear";
  game.classList.remove("hide");
  startMenu.classList.add("hide");
  window.requestAnimationFrame(checkCollision);
};

window.requestAnimationFrame(checkCollision);
