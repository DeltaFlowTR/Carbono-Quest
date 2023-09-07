import GameAnimation, { Frame } from './GameAnimation';

/**
 * A class responsible for managing the animations of a game object.
 * There should be one instance of this class for each game object even if they are identical
 */
class Animator {
	private animations: { [key: string]: GameAnimation };
	private staticFrames: { [key: string]: Frame };
	private currentAnimationName: string;
	private animationRunning: boolean = false;

	constructor(startAnimationName: string) {
		this.animations = {};
		this.staticFrames = {};
		this.currentAnimationName = startAnimationName;
	}

	/**
	 * Adds an animation that can be played later on
	 * @param animationName The name of the animation. It will be used to play the animation later
	 * @param animation The Animation to play
	 * @param staticFrame An static frame that will be rendered when the animation isn't running
	 */
	public addAnimation(animationName: string, animation: GameAnimation, staticFrame: Frame): void {
		this.animations[animationName] = animation;
		this.staticFrames[animationName] = staticFrame;
	}

	/**
	 * Starts playing an animation. Runningt this will also stop any previous running animation
	 * @param animationName The name of the animation to play
	 * @returns
	 */
	public startAnimation(animationName: string): void {
		if (this.currentAnimationName == animationName && this.animationRunning) return; // Ignore this animation is already running
		if (this.animationRunning) this.stopAnimation(); // Stop the current animation before starting another

		this.currentAnimationName = animationName;
		this.animationRunning = true;
		this.animations[animationName].startAnimationLoop();
	}

	/**
	 * Stops the current playing animation
	 * @returns
	 */
	public stopAnimation(): void {
		if (!this.animationRunning) return;

		this.animations[this.currentAnimationName].stopAndReset();
		this.animationRunning = false;
	}

	public getCurrentFrame() {
		if (this.animationRunning) return this.animations[this.currentAnimationName].getCurrentFrame();
		else return this.staticFrames[this.currentAnimationName];
	}
}

export default Animator;
