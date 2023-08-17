import Animator from '../renderer/animation/Animator';
import GameObject from './GameObject';

class GameItem extends GameObject {
	private static readonly floatingAnimationOffset: number = 5;
	private frameCount: number = 0;

	constructor(x: number, y: number, width: number, height: number, scale: number, sprite: HTMLImageElement, identifier?: string, userAnimation?: boolean, animator?: Animator | undefined) {
		super(x, y, width, height, scale, sprite, identifier || 'GENERIC_ITEM', userAnimation, animator);
		this.renderShadow = true;
	}

	public render(context: CanvasRenderingContext2D): void {
		this.frameCount++;
		const animY = Math.sin(this.frameCount / GameItem.floatingAnimationOffset / 6) * GameItem.floatingAnimationOffset;

		context.fillStyle = 'blue';
		context.fillRect(this.x - this.width / 2, this.y - this.height / 2 - animY, this.width * this.scale, this.height * this.scale);
	}
}

export default GameItem;
