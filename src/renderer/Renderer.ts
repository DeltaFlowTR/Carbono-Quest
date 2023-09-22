import GameObject from '../Engine/GameObject';
import { Vector2f } from '../Game';
import Canvas from './Canvas';

/**
 * Represents an animation frame.
 * The positions declared at this interface represents the position of the top-left and bottom-right pixel of the frame, respectively.
 */
interface Frame {
	firstPosition: { x: number; y: number };
	secondPosition: { x: number; y: number };
}

class Renderer {
	private readonly canvas: Canvas;
	private readonly canvasContext: CanvasRenderingContext2D;

	constructor() {
		this.canvas = new Canvas('canvas');
		this.canvasContext = this.canvas.getContext();

		this.canvasContext.imageSmoothingEnabled = false;
	}

	public convertCoodinates(x: number, y: number, worldOffset: Vector2f) {
		const canvasSize = this.canvas.getSize();

		return {
			x: x - worldOffset.x + canvasSize.width / 2,
			y: y - worldOffset.y + canvasSize.height / 2,
		};
	}

	/**
	 * Clear the canvas
	 */
	public clear(): void {
		this.canvasContext.clearRect(0, 0, this.canvas.getWidth(), this.canvas.getHeight());

		this.canvasContext.save();
		this.canvasContext.fillStyle = '#9c9c9c';
		this.canvasContext.fillRect(0, 0, 1920, 1080);
		this.canvasContext.restore();
	}

	/**
	 * Draws one game object into the screen
	 * @param object The object to render
	 * @param worldOffset The world offset used to create the illusion of camera
	 */
	public drawGameObject(object: GameObject, worldOffset: Vector2f) {
		this.canvasContext.save();

		const width = object.getWidth() * object.getScale();
		const height = object.getHeight() * object.getScale();

		const objectSprite = object.getSprite();

		const convertedCoordinates = this.convertCoodinates(object.getX(), object.getY(), worldOffset);

		if (!object.isAnimated()) {
			const frame = object.getSpriteFrame() || object.getFullSizeFrame();

			this.drawImage(objectSprite, frame, convertedCoordinates.x, convertedCoordinates.y, width, height);
		} else {
			const animator = object.getAnimator();
			this.drawImage(objectSprite, animator.getCurrentFrame(), object.getX(), object.getY(), width, height);
		}

		this.canvasContext.restore();
	}

	/**
	 * Draws an image on the screen
	 * @param spriteImage The sprite
	 * @param spriteFrame The area of the sprite that should be rendered
	 * @param x The rendered image X position
	 * @param y The rendered image Y position
	 * @param width The rendered image width
	 * @param height The rendered image height
	 */
	public drawImage(spriteImage: HTMLImageElement, spriteFrame: Frame, x: number, y: number, width: number, height: number): void {
		this.canvasContext.save();

		this.canvasContext.drawImage(
			spriteImage,
			spriteFrame.firstPosition.x,
			spriteFrame.firstPosition.y,
			spriteFrame.secondPosition.x - spriteFrame.firstPosition.x,
			spriteFrame.secondPosition.y - spriteFrame.firstPosition.y,
			x - width / 2,
			y - height / 2,
			width,
			height
		);

		this.canvasContext.restore();
	}

	/**
	 * Draws a line of text on the screen
	 * @param text The text to render
	 * @param x The X position
	 * @param y The Y position
	 * @param textFont The text's font
	 * @param color The text's color
	 */
	public drawText(text: string, x: number, y: number, textFont: string, color: string = 'black') {
		this.canvasContext.save();

		this.canvasContext.fillStyle = color;
		this.canvasContext.font = textFont;
		this.canvasContext.fillText(text, x, y);

		this.canvasContext.restore();
	}

	/**
	 * Draws a gameObject's hitbox
	 * @param x The X position of the object
	 * @param y The Y position of the object
	 * @param width The width of the object
	 * @param height The height of the object
	 * @param worldOffset The world offset used to create the illusion of camera
	 * @param forPlayer Whatever the object is the player of not
	 */
	public drawHitbox(x: number, y: number, width: number, height: number, worldOffset: Vector2f, forPlayer: boolean = false) {
		const convertedCoodinates = !forPlayer ? this.convertCoodinates(x, y, worldOffset) : { x: x, y: y };

		this.canvasContext.save();

		this.canvasContext.strokeStyle = 'red';
		this.canvasContext.strokeRect(convertedCoodinates.x - width / 2, convertedCoodinates.y - height / 2, width, height);

		this.canvasContext.restore();
	}

	/**
	 * Draws a gameObject's shadow
	 * @param x The X position of the object
	 * @param y The Y position of the object
	 * @param objectHeight The height of the object
	 * @param shadowScale The shadow's scale
	 * @param worldOffset The world offset used to create the illusion of camera
	 * @param forPlayer Whatever the object is the player or not
	 */
	public drawShadow(x: number, y: number, objectHeight: number, shadowScale: number, worldOffset: Vector2f, forPlayer: boolean = false) {
		const shadowSprite = GameObject.SHADOW_SPRITE;
		const convertedCoodinates = !forPlayer ? this.convertCoodinates(x, y, worldOffset) : { x: x, y: y };

		this.canvasContext.save();

		this.canvasContext.drawImage(
			shadowSprite,
			convertedCoodinates.x - (shadowSprite.width / 2) * shadowScale,
			convertedCoodinates.y + objectHeight / 2 - shadowSprite.height / 2,
			shadowSprite.width * shadowScale,
			shadowSprite.height * shadowScale
		);

		this.canvasContext.restore();
	}

	public getCanvas() {
		return this.canvas;
	}
}

export default Renderer;
export { Frame };
