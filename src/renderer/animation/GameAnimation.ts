import { Frame } from "../Renderer";

/**
 * Represents an animation that can be played by the Animator class.
 * This class should not be used directly
 */
class GameAnimation {
	private frames: Frame[];
	private AnimationInterval: number;
	private currentFrameIndex: number;
	private nextFrameTimeout: NodeJS.Timeout;

	constructor(frameIntervalMillis: number, frames: Frame[]) {
		this.frames = frames;
		this.AnimationInterval = frameIntervalMillis;
	}

	/**
	 * Starts changing the frames of the animation at an interval defined in the constructor
	 */
	public startAnimationLoop(): void {
		this.currentFrameIndex = 0;

		const next = () => {
			this.currentFrameIndex++;
			if (this.currentFrameIndex >= this.frames.length) this.currentFrameIndex = 0; // If we reached the final frame of the animation, then set it back to the first one
			this.nextFrameTimeout = setTimeout(next, this.AnimationInterval);
		};

		next();
	}

	/**
	 * Stops the frame change loop and reset the current frame back to the first one
	 */
	public stopAndReset() {
		clearTimeout(this.nextFrameTimeout);
		this.currentFrameIndex = 0;
	}

	public getCurrentFrame() {
		return this.frames[this.currentFrameIndex];
	}

	/**
	 * Renders the current frame
	 * @param context The rendering context
	 * @param sprite The sprite containing the frames defined on the constructor
	 * @param x The X position to render the frame
	 * @param y The Y position to render the frame
	 * @param width The width of the rendered frame
	 * @param height The height of the rendered frame
	 */
	public drawFrame(context: CanvasRenderingContext2D, sprite: HTMLImageElement, x: number, y: number, width: number, height: number) {
		const frame = this.getCurrentFrame();

		context.drawImage(
			sprite,
			frame.firstPosition.x,
			frame.firstPosition.y,
			frame.secondPosition.x - frame.firstPosition.x,
			frame.secondPosition.y - frame.firstPosition.y,
			x - width / 2,
			y - height / 2,
			width,
			height
		);
	}
}

export default GameAnimation;
export { Frame };
