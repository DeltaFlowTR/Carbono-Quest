import IRenderable from "./renderer/IRenderable";

class Player implements IRenderable {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private dir: 1 | -1 = 1;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public render(context: CanvasRenderingContext2D, deltaTime: number): void {
        context.save();

        context.fillStyle = "red";
        context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);

        context.restore();

        this.x = this.x + this.dir;

        if(this.x >= 500 || this.x <= 50) {
            this.dir *= -1;
        }
    }
}

export default Player;
