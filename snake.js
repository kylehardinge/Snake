class Game {
    constructor(gameWidth, gameHeight, cellSize) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.cellSize = cellSize
    }

    start() {
        this.background = new Background(this);
        this.snake = new Snake(this);
        this.apple = new Apple(this);
        new InputHandler(this.snake);

        this.gameObjects = [this.background, this.snake, this.apple];

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

class Background {
    constructor(game) {
        this.screenWidth = game.screenWidth;
        this.screenHeight = game.screenHeight;
        this.cellSize = game.cellSize;
        this.color = '#000';
        this.x = 0;
        this.y = 0;
    }

    update(deltaTime) {
        return;
    }

    draw(ctx) {
        var i;
        var j;
        ctx.fillStyle = this.color;
        for (i = 0; i < 18; i++) {
            for (j = 0; j < 18; j++) {
                ctx.fillRect(j * (cellSize + 1), i * (cellSize + 1), this.cellSize, this.cellSize);
                // console.log(i, j)
            }
        }

    }
}

class Snake {
    constructor(game) {
        this.screenWidth = game.screenWidth;
        this.screenHeight = game.screenHeight;
        this.cellSize = game.cellSize;
        this.color = '#17bd11'
        this.snakeSections = [{
            x: 1,
            y: 9,
            direction: 'right'
        }]
    }

    update(deltaTime) {
        switch (this.snakeSections[0].direction) {
            case 'left':
                this.snakeSections[0].x -= 1;
                break;
            case 'right':
                this.snakeSections[0].x += 1;
                break;
            case 'up':
                this.snakeSections[0].y -= 1;
                break;
            case 'down':
                this.snakeSections[0].y += 1;
                break;
            default:
                break;
        }
        // console.log(this.snakeSections[0].x, this.snakeSections[0].y)

    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.snakeSections[0].x * (this.cellSize + 1), this.snakeSections[0].y * (this.cellSize + 1), cellSize, cellSize);
    }

    move(direction) {
        var currentDirection = this.snakeSections[0].direction;
        console.log(this.snakeSections[0].direction);
        if (direction != currentDirection) {
            if (this.snakeSections.length < 2) {
                this.snakeSections[0].direction = direction;
            } else {

                switch (true) {
                    case (direction === 'up' && currentDirection === 'down'):
                    case (direction === 'right' && currentDirection === 'left'):
                    case (direction === 'down' && currentDirection === 'up'):
                    case (direction === 'left' && currentDirection === 'right'):
                        console.log('direction change not possible');
                        break;
                    default:
                        this.snakeSections[0].direction = direction;
                }
            }
        }

    }

    checkApple() {
        let appleX = this.game.apple.position.x
        let appleY = this.game.apple.position.y
        if (this.snakeSections[0].x === appleX &&
            this.snakeSections[0].y === appleY) {
            console.log('you ate the apple')
        }
    }

}

class Apple {
    constructor(game) {
        this.screenWidth = game.screenWidth;
        this.screenHeight = game.screenHeight;
        this.cellSize = game.cellSize;
        this.color = '#bd1111';
        this.position = {
            x: 14,
            y: 9
        };
    }

    update(deltaTime) {
        return;
    }


    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x * (this.cellSize + 1), this.position.y * (this.cellSize + 1), cellSize, cellSize);
    }
}

class InputHandler {
    constructor(snake) {
        document.addEventListener('keydown', event => {
            // console.log(event.keyCode)
            switch (event.keyCode) {
                case 87:
                case 38:
                    // console.log('up');
                    snake.move('up');
                    break;
                case 65:
                case 37:
                    // console.log('left');
                    snake.move('left');
                    break;
                case 83:
                case 40:
                    // console.log('down');
                    snake.move('down');
                    break;
                case 68:
                case 39:
                    // console.log('right');
                    snake.move('right');
                    break;
                default:
                    break;
            }
        })
    }
}

let canvas = document.getElementById('gameWindow');
let ctx = canvas.getContext('2d');
var canvasWidth = canvas.clientWidth;
var canvasHeight = canvas.clientHeight;
var cellSize = 24;
var speed = 5;


var game = new Game(canvasWidth, canvasHeight, cellSize)
game.start()

var lastTime = 0;

function gameLoop(timestamp) {

    setTimeout(function () {
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        game.update(deltaTime);
        game.draw(ctx);
        // console.log('hello')
        requestAnimationFrame(gameLoop);
    }, 1000 / speed);

}

requestAnimationFrame(gameLoop);