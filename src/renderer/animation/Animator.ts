import GameAnimation, { Frame } from "./GameAnimation";

class Animator {
    private animations: { [key: string]: GameAnimation};
    private staticFrames: { [key: string]: Frame};
    private currentAnimationName: string;
    private animationRunning: boolean = false;
    private sprite: HTMLImageElement;

    constructor(sprite: HTMLImageElement, startAnimationName: string) {
        this.animations = {};
        this.staticFrames = {};
        this.currentAnimationName = startAnimationName;
        this.sprite = sprite;
    }

    public addAnimation(animationName: string, animation: GameAnimation, staticFrame: Frame): void {
        this.animations[animationName] = animation;
        this.staticFrames[animationName] = staticFrame;
    }

    public startAnimation(animationName: string): void {
        if(this.currentAnimationName == animationName && this.animationRunning) return; // Ignore this animation is already running
        if(this.animationRunning) this.stopAnimation(); // Stop the current animation before starting another

        this.currentAnimationName = animationName;
        this.animationRunning = true;
        this.animations[animationName].startAnimationLoop();
    }

    public stopAnimation(): void {
        if(!this.animationRunning) return;

        this.animations[this.currentAnimationName].stopAndReset();
        this.animationRunning = false;
    }

    public drawAnimationFrame(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
        const animation = this.animations[this.currentAnimationName];
        const staticFrame = this.staticFrames[this.currentAnimationName];

        if(this.animationRunning) animation.drawFrame(context, this.sprite, x, y, width, height);
        else {
            context.drawImage(
                this.sprite, 
                staticFrame.firstPosition.x, 
                staticFrame.firstPosition.y, 
                staticFrame.secondPosition.x - staticFrame.firstPosition.x, 
                staticFrame.secondPosition.y - staticFrame.firstPosition.y, 
                x - width / 2, 
                y - height / 2, 
                width, 
                height
            );
        }
    }
}

export default Animator;
