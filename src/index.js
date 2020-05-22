import Game from '/Snake/src/game.js';


let canvas = document.getElementById('gameWindow');
let ctx = canvas.getContext('2d');
const SCREEN_WIDTH = 650;
const SCREEN_HEIGHT = 650;
// document.getElementById('gameWindow').style.width = SCREEN_WIDTH + 'px';
// document.getElementById('gameWindow').style.height = SCREEN_HEIGHT + 'px';


var cellSize = 24;
var speed = 7;


var game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT, cellSize);
game.start();

var lastTime = 0;

document.getElementById('startGame').style.visibility = 'visible';

function gameLoop(timestamp) {

    setTimeout(function () {
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        game.update(deltaTime);
        game.draw(ctx);
        // console.log('hello')
        requestAnimationFrame(gameLoop);
    }, 1000 / speed);

}

requestAnimationFrame(gameLoop);