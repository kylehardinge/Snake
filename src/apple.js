export default class Apple {
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
        ctx.fillRect(this.position.x * (this.cellSize + 1), this.position.y * (this.cellSize + 1), this.cellSize, this.cellSize);
    }
}
