import { GRID_SIZE } from "./grid.js";

export class Snake {
  SNAKE_SPEED = 5;
  snakeBody = [{ x: 11, y: 11 }];
  direction = { x: 0, y: 0 };
  lastDirection = { x: 0, y: 0 };

  getSpeed() {
    return this.SNAKE_SPEED;
  }

  getLastDirection() {
    return this.lastDirection;
  }

  getSnakeBody() {
    return this.snakeBody;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  updateSnake() {
    this.lastDirection = this.direction;

    const n = this.snakeBody.length;
    for (let i = 0; i <= n - 2; i++) {
      this.snakeBody[i] = { ...this.snakeBody[i + 1] };
    }
    this.snakeBody[n - 1].x += this.direction.x;
    this.snakeBody[n - 1].y += this.direction.y;
  }

  drawSnake(gameBoard) {
    this.snakeBody.forEach((coordinate) => {
      const snakeElement = document.createElement("div");
      snakeElement.style.gridRowStart = coordinate.y;
      snakeElement.style.gridColumnStart = coordinate.x;
      snakeElement.classList.add("snake");
      gameBoard.appendChild(snakeElement);
    });
  }

  expandSnake() {
    this.snakeBody.unshift({ ...this.snakeBody[0] });
  }

  getHead() {
    const n = this.snakeBody.length;
    return this.snakeBody[n - 1];
  }

  checkDeath() {
    return (
      this.isOutsideGrid(this.getHead()) || this.headOnSnake(this.getHead())
    );
  }

  isOutsideGrid(snakeHead) {
    return (
      snakeHead.x < 1 ||
      snakeHead.x > GRID_SIZE ||
      snakeHead.y < 1 ||
      snakeHead.y > GRID_SIZE
    );
  }

  headOnSnake(snakeHead) {
    for (let i = 0; i < this.snakeBody.length - 2; i++) {
      if (
        snakeHead.x === this.snakeBody[i].x &&
        snakeHead.y === this.snakeBody[i].y
      )
        return true;
    }
    return false;
  }

  eatFood(food) {
    const n = this.snakeBody.length;
    return (
      food.getFoodPosition().x === this.snakeBody[n - 1].x &&
      food.getFoodPosition().y === this.snakeBody[n - 1].y
    );
  }
}
