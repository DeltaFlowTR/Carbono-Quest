import GameObject from '../Engine/GameObject';
import Game, { Vector2f } from '../Game';
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

	constructor(game: Game) {
		this.canvas = new Canvas('canvas', game);
		this.canvasContext = this.canvas.getContext();
	}

	public convertCoodinates(x: number, y: number, worldOffset: Vector2f) {
		const canvasSize = this.canvas.getSize();

		return {
			x: x - worldOffset.x + canvasSize.width / 2,
			y: y - worldOffset.y + canvasSize.height / 2,
		};
	}

	public clear(): void {
		this.canvasContext.clearRect(0, 0, this.canvas.getWidth(), this.canvas.getHeight());
	}

	public renderGameObject(object: GameObject, worldOffset: Vector2f) {
		this.canvasContext.save();

		const width = object.getWidth() * object.getScale();
		const height = object.getHeight() * object.getScale();

		const objectSprite = object.getSprite();

		const convertedCoordinates = this.convertCoodinates(object.getX(), object.getY(), worldOffset);

		if (!object.isAnimated()) {
			const spriteSize = Canvas.getSpriteSize(objectSprite);
			const fullSizeFrame: Frame = {
				firstPosition: { x: 0, y: 0 },
				secondPosition: { x: spriteSize.width, y: spriteSize.height },
			};

			this.renderImage(objectSprite, fullSizeFrame, convertedCoordinates.x, convertedCoordinates.y, width, height);
		} else {
			const animator = object.getAnimator();
			this.renderImage(objectSprite, animator.getCurrentFrame(), object.getX(), object.getY(), width, height);
		}

		this.canvasContext.restore();
	}

	public renderImage(spriteImage: HTMLImageElement, spriteFrame: Frame, x: number, y: number, width: number, height: number) {
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

	public renderText(text: string, x: number, y: number, textFont: string, color: string = 'black') {
		this.canvasContext.save();

		this.canvasContext.fillStyle = color;
		this.canvasContext.font = textFont;
		this.canvasContext.fillText(text, x, y);

		this.canvasContext.restore();
	}

	public drawHitbox(x: number, y: number, width: number, height: number, worldOffset: Vector2f, forPlayer: boolean = false) {
		const convertedCoodinates = !forPlayer ? this.convertCoodinates(x, y, worldOffset) : { x: x, y: y };

		this.canvasContext.save();

		this.canvasContext.strokeStyle = 'red';
		this.canvasContext.strokeRect(convertedCoodinates.x - width / 2, convertedCoodinates.y - height / 2, width, height);

		this.canvasContext.restore();
	}

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
