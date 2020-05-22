export default class Snake {
    constructor(game) {
        this.screenWidth = game.screenWidth;
        this.screenHeight = game.screenHeight;
        this.cellSize = game.cellSize;
        this.color = '#17bd11'
        this.game = game
        // this.defaultSnakeSection = {
        //     x: 1,
        //     y: 9,
        //     direction: 'right'
        // }
        this.snakeSections = [{
            x: 1,
            y: 9,
            prevX: 1,
            prevY: 9,
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
        // Math.floor((this.screenHeight / this.cellSize) * (this.screenWidth / this.cellSize) - 1)
        const game = this.game
        if (this.snakeSections.length === (Math.floor((this.screenHeight / this.cellSize) * (this.screenWidth / this.cellSize) - 1))) {
            this.game.endGameTooGood();
        }
        this.collisionDetection();
        if (this.addSection === true) {
            this.snakeSections.push(JSON.parse(JSON.stringify(this.snakeSections[this.snakeSections.length - 1])));
            this.snakeSections[this.snakeSections.length - 1].skip = true;
            this.addSection = false;
        };
        if (this.game.gameEnded === false) {
            this.snakeSections.forEach(function (item, index, object) {
                if (item.turns.length > 0) {
                    item.turns.forEach(function (turn, number, turnsArray) {
                        if (turn.x === item.x && turn.y === item.y) {
                            item.direction = turn.direction;
                            turnsArray.splice(turn, 1);
                        }
                    });
                }
                if (item.skip === false) {
                    
                    if (index === 0) {
                        switch (item.direction) {
                            case 'left':
                                if (item.x >= 1) {
                                    item.x -= 1;
                                } else {
                                    game.endGame();
                                }
                                break;
                            case 'right':
                                if (item.x <= 24) {
                                    item.x += 1;
                                } else {
                                    game.endGame();
                                }
                                break;
                            case 'up':
                                if (item.y >= 1) {
                                    item.y -= 1;
                                } else {
                                    game.endGame();
                                }
                                break;
                            case 'down':
                                if (item.y <= 24) {
                                    item.y += 1;
                                } else {
                                    game.endGame();
                                }
                                break;
                            default:
                                break;
                        }
                    } else {
                        switch (item.direction) {
                            case 'left':
                                item.x -= 1;
                                break;
                            case 'right':
                                item.x += 1;
                                break;
                            case 'up':
                                item.y -= 1;
                                break;
                            case 'down':
                                item.y += 1;
                                break;
                            default:
                                break;
                        }
                    }
                } else {
                    item.skip = false;
                }
            });
        }

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
                this.snakeSections.forEach(function (item, index, object) {
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
        const game = this.game
        this.snakeSections.forEach(function(item, index, object) {
            object.forEach(function(item2, index2) {
                if (item.x === item2.x && item.y === item2.y && index !== index2) {
                    game.endGame();
                }
            });
        });
        // for (const section1 of this.snakeSections) {
        //     for (const section2 of this.snakeSections) {
        //         if (section1.x === section2.x && section1.y === section2.y) {
        //             console.log('you loose')
        //         }
        //     }
        // }

    }

}