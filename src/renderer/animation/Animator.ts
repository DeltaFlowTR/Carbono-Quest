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
	private sprite: HTMLImageElement;

	constructor(sprite: HTMLImageElement, startAnimationName: string) {
		this.animations = {};
		this.staticFrames = {};
		this.currentAnimationName = startAnimationName;
		this.sprite = sprite;
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

	/**
	 * Drawns the current animation frame. If the animation isn't running then the static frame of the animation will be rendered instead
	 * @param context The rendering context
	 * @param x The X position to render it
	 * @param y The Y position to render it
	 * @param width The width of the rendered image
	 * @param height The height of the rendered image
	 */
	public drawAnimationFrame(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
		const animation = this.animations[this.currentAnimationName];
		const staticFrame = this.staticFrames[this.currentAnimationName];

		if (this.animationRunning) animation.drawFrame(context, this.sprite, x, y, width, height);
		else {
			// context.strokeStyle = "green";
			// context.strokeRect(x - width / 2, y - height / 2, width, height);

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
