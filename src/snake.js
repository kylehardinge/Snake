export default class Snake {
    constructor(game) {
        this.screenWidth = game.screenWidth;
        this.screenHeight = game.screenHeight;
        this.cellSize = game.cellSize;
        this.color = '#17bd11'
        this.game = game
        this.defaultSnakeSection = {
            x: 1,
            y: 9,
            direction: 'right'
        }
        this.snakeSections = [{
            x: 1,
            y: 9,
            direction: 'right',
            skip: false,
            turns: []
        }]
        this.addSection = false
    }

    update(deltaTime) {
        // this.snakeSections.forEach(function (object, index) {
        //     if (index !== 0) {
                // object.direction = this.snakeSections[index - 1].direction
        //         console.log(this.snakeSections[index - 1].direction)
        //     }
        // });
        // this.snakeSections.forEach(object => console.log(object));

        if (this.addSection === true) {
            this.snakeSections.push(JSON.parse(JSON.stringify(this.snakeSections[this.snakeSections.length - 1])));
            this.snakeSections[this.snakeSections.length - 1].skip = true;
            this.addSection = false;
        }
        
        this.snakeSections.forEach(object => {
            if (object.turns.length > 0){
                object.turns.forEach(function(turn, index, turnsArray){
                    if (turn.x === object.x && turn.y === object.y) {
                        object.direction = turn.direction;
                        turnsArray.splice(turn, 1);
                    }
                });
            }
            if (object.skip === false) {
                switch (object.direction) {
                    case 'left':
                        if (object.x >= 1) {
                            object.x -= 1;
                        }
                        break;
                    case 'right':
                        if (object.x <= 24) {
                            object.x += 1;
                        }
                        break;
                    case 'up':
                        if (object.y >= 1) {
                            object.y -= 1;
                        }
                        break;
                    case 'down':
                        if (object.y <= 24) {
                            object.y += 1;
                        }
                        break;
                    default:
                        break;
                }
            } else {
                object.skip = false;
            }
        });

        this.collisionDetection();
        // console.log(this.snakeSections[0].x, this.snakeSections[0].y)

        // this.snakeSections.forEach(object => {
        //     if (object.index = 0) {
        //         console.log('hi')
        //     }
        // });

    }



    draw(ctx) {
        ctx.fillStyle = this.color;
        this.snakeSections.forEach(object => {
            ctx.fillRect(object.x * (this.cellSize + 1), object.y * (this.cellSize + 1), this.cellSize, this.cellSize);
        });
    }

    move(direction) {
        var currentDirection = this.snakeSections[0].direction;
        // console.log(this.snakeSections[0].direction);
        if (direction != currentDirection) {
            if (this.snakeSections.length < 2) {
                this.snakeSections[0].direction = direction;
            } else {

                switch (true) {
                    case (direction === 'up' && currentDirection === 'down'):
                    case (direction === 'right' && currentDirection === 'left'):
                    case (direction === 'down' && currentDirection === 'up'):
                    case (direction === 'left' && currentDirection === 'right'):
                        // console.log('direction change not possible');
                        break;
                    default:
                        this.snakeSections[0].direction = direction;
                };
                this.snakeSections.forEach(function(item, index, object) {
                    if (index !== 0) {
                        item.turns.push({
                            x: object[0].x,
                            y: object[0].y,
                            direction: object[0].direction
                        })
                    }
                });
            }
        }

    }

    checkApple() {
        let appleX = this.game.apple.position.x;
        let appleY = this.game.apple.position.y;
        if (this.snakeSections[0].x === appleX &&
            this.snakeSections[0].y === appleY) {
            this.addSection = true;
            // console.log('you ate the apple')

            this.game.apple.position.x = Math.floor(Math.random() * 25);
            this.game.apple.position.y = Math.floor(Math.random() * 25);
        }

    }

    collisionDetection() {
        // console.log('hello')

    }

}