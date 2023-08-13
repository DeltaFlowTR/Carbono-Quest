import Canvas from '../renderer/Canvas.js';
import IRenderable from '../renderer/IRenderable.js';
import ITickable from './ITickable.js';

/**
 * Represents an object that can be inserted into the game
 */
abstract class GameObject implements IRenderable {
	public static readonly SHADOW_SPRITE = Canvas.createSprite('img/Shadow.png');

	protected x: number;
	protected y: number;
	protected width: number;
	protected height: number;
	protected scale: number;
	protected renderShadow: boolean;

	constructor(x: number, y: number, width: number, height: number, scale: number) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.scale = scale;
	}

	/**
	 *
	 * @returns True if this object implements ITickable, false otherwise
	 */
	public isTickable(): this is ITickable {
		return 'tick' in this;
	}

	public hasShadow(): boolean {
		return this.renderShadow;
	}

	/**
	 * Draws a shadown bellow the current object
	 * @param context The rendering context
	 * @param shadowScale The scale of the shadow, 1 is default (64x30)
	 */
	public drawShadow(context: CanvasRenderingContext2D, shadowScale: number = 1): void {
		context.drawImage(
			GameObject.SHADOW_SPRITE,
			this.x - 32 * shadowScale,
			this.y + (this.height * shadowScale) / 2,
			64 * shadowScale,
			30 * shadowScale
		);
	}

	abstract render(context: CanvasRenderingContext2D): void;
}

export default GameObject;
