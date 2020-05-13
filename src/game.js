import Apple from '/src/apple.js';
import Snake from '/src/snake.js';
import InputHandler from '/src/input.js';
import Background from '/src/background.js';

export default class Game {
    constructor(screenWidth, screenHeight, cellSize) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.cellSize = cellSize;
    }

    start() {
        this.background = new Background(this);
        this.snake = new Snake(this);
        this.apple = new Apple(this);
        new InputHandler(this.snake);
        // console.log(this.screenWidth, this.screenHeight)
        this.gameObjects = [this.background, this.apple, this.snake];

        // new InputHandler(this.paddle);
    }

    update(deltaTime) {
        this.gameObjects.forEach(object => object.update(deltaTime));
    }

    draw(ctx) {
        this.gameObjects.forEach(object => object.draw(ctx))
        this.snake.checkApple()
    }
}
