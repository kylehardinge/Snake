export default class InputHandler {
    constructor(snake, game) {
        this.queue = []
        this.game = game
        document.addEventListener('keydown', event => {
            // console.log(event.keyCode)
            switch (event.keyCode) {
                case 87:
                case 38:
                    // console.log('up');
                    this.game.gameStarted = true;
                    if (this.queue[this.queue.length - 1] !== 'up') {
                        this.queue.push('up');
                    }
                    break;
                case 65:
                case 37:
                    // console.log('left');
                    this.game.gameStarted = true;
                    if (this.queue[this.queue.length - 1] !== 'left') {
                        this.queue.push('left');
                    }
                    break;
                case 83:
                case 40:
                    // console.log('down');
                    this.game.gameStarted = true;
                    if (this.queue[this.queue.length - 1] !== 'down') {
                        this.queue.push('down');
                    }
                    break;
                case 68:
                case 39:
                    // console.log('right');
                    this.game.gameStarted = true;
                    if (this.queue[this.queue.length - 1] !== 'right') {
                        this.queue.push('right');
                    }
                    break;
                default:
                    break;
            }
        })
    }
}