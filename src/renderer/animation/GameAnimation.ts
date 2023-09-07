import { Frame } from '../Renderer';

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
}

export default GameAnimation;
export { Frame };
