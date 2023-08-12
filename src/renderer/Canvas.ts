class Canvas {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private lastRenderTime: number;

    constructor(canvasId:string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");    

        this.render();
    }

    public async render() {
        this.clear();
        window.player.render(this.context, Date.now() - this.lastRenderTime);

        this.lastRenderTime = Date.now();
        requestAnimationFrame(() => this.render());
    }

    public clear(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default Canvas;
