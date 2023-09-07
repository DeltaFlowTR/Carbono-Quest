import Canvas from '../renderer/Canvas';
import Animator from '../renderer/animation/Animator';
import ITickable from './ITickable';

interface GameObjectProperties {
	x: number;
	y: number;
	width: number;
	height: number;
	scale?: number;
	objectSprite: HTMLImageElement;
	objectIdentifier: string;
	animator?: Animator;
}

/**
 * Represents an object that can be inserted into the game
 */
abstract class GameObject {
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

	constructor(properties: GameObjectProperties) {
		this.x = properties.x;
		this.y = properties.y;
		this.width = properties.width;
		this.height = properties.height;
		this.scale = properties.scale || 1;
		this.objectSprite = properties.objectSprite;
		this.objectIdentifier = properties.objectIdentifier;
		this.useAnimation = properties.animator != undefined;
		this.animator = properties.animator;
	}

	/**
	 *
	 * @returns True if this object implements ITickable, false otherwise
	 */
	public isTickable(): this is ITickable {
		return 'tick' in this;
	}

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
export { GameObjectProperties };
