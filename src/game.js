import Apple from '/src/apple.js';
import Snake from '/src/snake.js';
import InputHandler from '/src/input.js';
import Background from '/src/background.js';

export default class Game {
    constructor(screenWidth, screenHeight, cellSize) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.cellSize = cellSize;
        this.gameEnded = false;
        this.gameStarted = false;
        this.gameStartedFirstTime = false;
        this.startBtn = document.getElementById('start');
        this.diedBtn = document.getElementById('restartDeath');
        this.tooGoodBtn = document.getElementById('restartGood')
    }

    start() {
        this.background = new Background(this);
        this.snake = new Snake(this);
        this.apple = new Apple(this);
        this.InputHandler = new InputHandler(this.snake, this);
        if (this.gameStartedFirstTime === false) {
            this.startBtn.addEventListener('click', function () {
                document.getElementById('startGame').style.visibility = 'hidden'
                this.gameStartedFirstTime = true;
            }, {
                once: true
            });
        }
        // document.addEventListener('keydown', function() {
        //     this.gameStarted = true;
        //     console.log('the game should have started');
        // }, { once: true });
        // console.log(this.screenWidth, this.screenHeight)
        this.gameObjects = [this.background, this.apple, this.snake];

        // new InputHandler(this.paddle);
    }

    update(deltaTime) {
        if (this.gameEnded === false && this.gameStarted === true) {
            if (this.InputHandler.queue.length > 0) {
                this.snake.move(this.InputHandler.queue[0]);
                this.InputHandler.queue.shift()
            }
            this.gameObjects.forEach(object => object.update(deltaTime));
        };
    }

    draw(ctx) {
        this.gameObjects.forEach(object => object.draw(ctx))
        this.snake.checkApple()
    }
    // startGame() {
    //     this.gameStarted = true;
    //     this.startBtn.removeEventListener('keydown', this.startGame())
    // }
    endGame() {
        this.gameEnded = true;
        this.gameStarted = false;
        document.getElementById('died').style.visibility = 'visible';
        this.diedBtn.addEventListener('click', function(){
            document.getElementById('died').style.visibility = 'hidden';
            this.background, this.snake, this.apple, this.InputHandler = null;
            this.start();
            
        }, {once: true});
    }
}