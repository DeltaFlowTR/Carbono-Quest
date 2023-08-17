import Canvas from '../renderer/Canvas.js';
import IRenderable from '../renderer/IRenderable.js';
import Animator from '../renderer/animation/Animator.js';
import ITickable from './ITickable.js';

/**
 * Represents an object that can be inserted into the game
 */
abstract class GameObject implements IRenderable {
	public static readonly SHADOW_SPRITE = Canvas.createSprite('img/Shadow.png');

	protected readonly objectSprite: HTMLImageElement;

	protected x: number;
	protected y: number;
	protected width: number;
	protected height: number;
	protected scale: number;
	protected renderShadow: boolean;
	protected shadowScale: number = 1;
	protected animator: Animator | undefined;
	protected useAnimation: boolean;

	public readonly objectIdentifier: string;

	constructor(x: number, y: number, width: number, height: number, scale: number, objectSprite: HTMLImageElement, objectIdentifier: string, useAnimation?: boolean, animator?: Animator | undefined) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.scale = scale;
		this.objectSprite = objectSprite;
		this.objectIdentifier = objectIdentifier;
		this.useAnimation = useAnimation;
		this.animator = animator;
	}

	/**
	 *
	 * @returns True if this object implements ITickable, false otherwise
	 */
	public isTickable(): this is ITickable {
		return 'tick' in this;
	}

	/**
	 * Draws a shadown bellow the current object
	 * @param context The rendering context
	 * @param shadowScale The scale of the shadow, 1 is default (64x30)
	 */
	public drawShadow(context: CanvasRenderingContext2D): void {
		context.drawImage(
			GameObject.SHADOW_SPRITE,
			this.x - (GameObject.SHADOW_SPRITE.width / 2) * this.shadowScale,
			this.y + (this.height * this.scale) / 2 - 10,
			GameObject.SHADOW_SPRITE.width * this.shadowScale,
			GameObject.SHADOW_SPRITE.height * this.shadowScale
		);
	}

	public drawHitbox(context: CanvasRenderingContext2D): void {
		context.strokeStyle = 'red';

		context.strokeRect(
			this.x - (this.width * this.scale) / 2 - 1,
			this.y - (this.height * this.scale) / 2 - 1,
			this.width * this.scale + 1,
			this.height * this.scale + 1
		);
	}

	public drawObjectIdentifier(context: CanvasRenderingContext2D): void {
		context.fillStyle = "black";
		context.font = "12px Arial";

		context.fillText(this.objectIdentifier, this.x - this.width * this.scale / 2, this.y - this.height * this.scale / 2 - 10);
	}

	abstract render(context: CanvasRenderingContext2D): void;

	public getX() {
		return this.x;
	}

	public getY() {
		return this.y;
	}

	public getWidth() {
		return this.width;
	}

	public getHeight() {
		return this.height;
	}

	public getScale() {
		return this.scale;
	}

	public getShadowScale() {
		return this.shadowScale;
	}

	public getSprite() {
		return this.objectSprite;
	}

	public getObjectIdentifier() {
		return this.objectIdentifier;
	}

	public hasShadow() {
		return this.renderShadow;
	}

	public isAnimated() {
		return this.useAnimation;
	}

	public getAnimator() {
		return this.animator;
	}
}

export default GameObject;
