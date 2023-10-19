import { GRID_SIZE } from "./grid.js";

export class Food {
  foodPosition = { x: 6, y: 6 };

  getFoodPosition() {
    return this.foodPosition;
  }

  updateFood(snake) {
    this.foodPosition = this.getRandomFoodPosition(snake.getSnakeBody());
  }

  getRandomFoodPosition(snakeBody) {
    let newFoodPosition;
    while (
      newFoodPosition === undefined ||
      this.onSnake(newFoodPosition, snakeBody)
    ) {
      newFoodPosition = {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1,
      };
    }
    return newFoodPosition;
  }

  onSnake(newFoodPosition, snakeBody) {
    const n = snakeBody.length;
    for (let i = 0; i < n; i++) {
      if (
        newFoodPosition.x === snakeBody[i].x &&
        newFoodPosition.y === snakeBody[i].y
      )
        return true;
    }
    return false;
  }

  drawFood(gameBoard) {
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = this.foodPosition.y;
    foodElement.style.gridColumnStart = this.foodPosition.x;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
  }
}
