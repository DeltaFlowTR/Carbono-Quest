interface Frame {
    firstPosition: {x: number, y: number},
    secondPosition: {x: number, y: number}
}

class GameAnimation {
    private frames: Frame[];
    private AnimationInterval: number;
    private currentFrameIndex: number;
    private nextFrameTimeout: NodeJS.Timeout;
    
    constructor(frameIntervalMillis: number, frames: Frame[]) {
        this.frames = frames;
        this.AnimationInterval = frameIntervalMillis;
    }

    public startAnimationLoop(): void {
        this.currentFrameIndex = 0;

        const next = () => {
            this.currentFrameIndex++;
            if(this.currentFrameIndex >= this.frames.length) this.currentFrameIndex = 0;
            this.nextFrameTimeout = setTimeout(next, this.AnimationInterval);
        }

        next();
    }

    public stopAndReset() {
        clearTimeout(this.nextFrameTimeout);
        this.currentFrameIndex = 0;
    }

    public drawFrame(context: CanvasRenderingContext2D, sprite: HTMLImageElement, x: number, y: number, width: number, height: number) {
        const frame = this.frames[this.currentFrameIndex];

        context.drawImage(
            sprite, 
            frame.firstPosition.x, 
            frame.firstPosition.y, 
            frame.secondPosition.x - frame.firstPosition.x, 
            frame.secondPosition.y - frame.firstPosition.y, 
            x - width / 2, 
            y - width / 2, 
            width, 
            height
        );
    }
}

export default GameAnimation;
export { Frame };
