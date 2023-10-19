import { Food } from "./food.js";
import { Snake } from "./snake.js";

const food = new Food();
const snake = new Snake();
let gameOver = false;
let lastRenderTime = 0;

const gameBoard = document.getElementById("game-board");

function main(currentTime) {
  if (gameOver) {
    if (confirm("You lose. Press OK to restart!")) {
      window.location = "/";
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / snake.getSpeed()) return;
  lastRenderTime = currentTime;

  update();
  draw(gameBoard);
}

window.requestAnimationFrame(main);

function update() {
  snake.updateSnake();
  if (snake.eatFood(food)) {
    snake.expandSnake();
    food.updateFood(snake);
  }
  gameOver = snake.checkDeath();
}

function draw(gameBoard) {
  gameBoard.innerHTML = "";
  snake.drawSnake(gameBoard);
  food.drawFood(gameBoard);
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (snake.getLastDirection().y !== 0) break;
      snake.setDirection({ x: 0, y: -1 });
      break;
    case "ArrowDown":
      if (snake.getLastDirection().y !== 0) break;
      snake.setDirection({ x: 0, y: 1 });
      break;
    case "ArrowLeft":
      if (snake.getLastDirection().x !== 0) break;
      snake.setDirection({ x: -1, y: 0 });
      break;
    case "ArrowRight":
      if (snake.getLastDirection().x !== 0) break;
      snake.setDirection({ x: 1, y: 0 });
      break;
    default:
      break;
  }
});
