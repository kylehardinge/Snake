export default class InputHandler {
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
