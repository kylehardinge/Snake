export default class Background {
    constructor(game) {
        this.screenWidth = game.screenWidth;
        this.screenHeight = game.screenHeight;
        this.cellSize = game.cellSize;
        this.game = game;
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
        // console.log(this.screenHeight/(this.cellSize + 1), this.screenHeight, this.cellSize);
        ctx.fillStyle = this.color;
        for (i = 0; i < 26; i++) {
            for (j = 0; j < 26; j++) {
                ctx.fillRect(j * (this.cellSize + 1), i * (this.cellSize + 1), this.cellSize, this.cellSize);
                // console.log(i, j)
            }
        }

    }
}
