import GameObject from './Engine/GameObject';
import ITickable from './Engine/ITickable';
import Road from './Engine/Objects/Road';
import Animator from './renderer/animation/Animator';
import GameAnimation from './renderer/animation/GameAnimation';
import Canvas from './renderer/Canvas';

/**
 * Represents the player inside the game. This class is responsible for handling
 * all the movimentation and interactions between the player and the game
 */
class Player extends GameObject implements ITickable {
	private readonly normalPlayerSpeed = 2.5;
	private readonly sprintPlayerSpeed = 4;

	private playerSpeed: number;

	private goingUp: boolean;
	private goingDown: boolean;
	private goingLeft: boolean;
	private goingRight: boolean;

	constructor() {
		const animator = new Animator('WalkDown');

		super({
			x: 0,
			y: 0,
			width: 34,
			height: 52,
			scale: 1.5,
			objectSprite: Canvas.createSprite('img/Character.png'),
			objectIdentifier: 'PLAYER',
			animator: animator,
		});

		this.playerSpeed = this.normalPlayerSpeed;

		this.renderShadow = true;
		this.shadowScale = 0.7;

		const animationWalkUp = new GameAnimation(250, [
			{
				firstPosition: { x: 35, y: 0 },
				secondPosition: { x: 69, y: 52 },
			},
			{
				firstPosition: { x: 70, y: 0 },
				secondPosition: { x: 104, y: 52 },
			},
		]);

		const animationWalkDown = new GameAnimation(250, [
			{
				firstPosition: { x: 35, y: 53 },
				secondPosition: { x: 69, y: 105 },
			},
			{
				firstPosition: { x: 70, y: 53 },
				secondPosition: { x: 104, y: 105 },
			},
		]);

		const animationWalkLeft = new GameAnimation(250, [
			{
				firstPosition: { x: 35, y: 159 },
				secondPosition: { x: 69, y: 211 },
			},
			{
				firstPosition: { x: 70, y: 159 },
				secondPosition: { x: 104, y: 211 },
			},
		]);

		const animationWalkRight = new GameAnimation(250, [
			{
				firstPosition: { x: 35, y: 106 },
				secondPosition: { x: 69, y: 158 },
			},
			{
				firstPosition: { x: 70, y: 106 },
				secondPosition: { x: 104, y: 158 },
			},
		]);

		this.animator.addAnimation('WalkUp', animationWalkUp, {
			firstPosition: { x: 0, y: 0 },
			secondPosition: { x: 34, y: 52 },
		});

		this.animator.addAnimation('WalkDown', animationWalkDown, {
			firstPosition: { x: 0, y: 53 },
			secondPosition: { x: 34, y: 105 },
		});

		this.animator.addAnimation('WalkLeft', animationWalkLeft, {
			firstPosition: { x: 0, y: 159 },
			secondPosition: { x: 34, y: 211 },
		});

		this.animator.addAnimation('WalkRight', animationWalkRight, {
			firstPosition: { x: 0, y: 106 },
			secondPosition: { x: 34, y: 158 },
		});

		window.addEventListener('keydown', (event) => {
			const key = event.key.toLowerCase();

			// If the key is any of the control keys then we prevent the default action from happening, that way the player doesn't activate any unwantend shortcut
			if (key == 'w' || key == 's' || key == 'a' || key == 'd' || key == 'shift') event.preventDefault();

			switch (key) {
				case 'w':
					this.goingUp = true;
					break;
				case 's':
					this.goingDown = true;
					break;
				case 'a':
					this.goingLeft = true;
					break;
				case 'd':
					this.goingRight = true;
					break;
				case 'shift':
					this.playerSpeed = this.sprintPlayerSpeed;
					break;
			}
		});

		window.addEventListener('keyup', (event) => {
			const key = event.key.toLowerCase();

			// If the key is any of the control keys then we prevent the default action from happening, that way the player doesn't activate any unwantend shortcut
			if (key == 'w' || key == 's' || key == 'a' || key == 'd' || key == 'shift') event.preventDefault();

			if (key == 'w') this.goingUp = false;
			if (key == 's') this.goingDown = false;
			if (key == 'a') this.goingLeft = false;
			if (key == 'd') this.goingRight = false;
			if (key == 'shift') this.playerSpeed = this.normalPlayerSpeed;
		});
	}

	public tick(): void {
		const previousX = this.x;
		const previousY = this.y;

		let newX = this.x;
		let newY = this.y;

		if (this.goingUp) newY -= this.playerSpeed;
		if (this.goingDown) newY += this.playerSpeed;
		if (this.goingLeft) newX -= this.playerSpeed;
		if (this.goingRight) newX += this.playerSpeed;

		const insideCorners = this.checkInsideRoad(newX, newY);

		const canGoLeft = insideCorners.topLeft && insideCorners.bottomLeft;
		const canGoRight = insideCorners.topRight && insideCorners.bottomRight;
		const canGoUp = insideCorners.topLeft && insideCorners.topRight;
		const canGoDown = insideCorners.bottomLeft && insideCorners.bottomRight;

		if (canGoLeft && canGoRight) this.x = newX;
		if (canGoUp && canGoDown) this.y = newY;

		if (this.y > previousY) {
			// We return on the Y checks to make the vertical animations have priority over the horizontal ones
			this.animator.startAnimation('WalkDown');
			return;
		} else if (this.y < previousY) {
			this.animator.startAnimation('WalkUp');
			return;
		}

		if (this.x > previousX) this.animator.startAnimation('WalkRight');
		else if (this.x < previousX) this.animator.startAnimation('WalkLeft');

		if (this.x === previousX && this.y === previousY) this.animator.stopAnimation();
	}

	/**
	 * Checks if the player's hitbox is inside a road
	 * @returns An object containing the corners that are inside the road
	 */
	public checkInsideRoad(x: number, y: number) {
		const scale = this.scale;
		const width = this.width * scale;
		const height = this.height * scale;

		const topLeft: [number, number] = [x - width / 2, y - height / 2];
		const topRight: [number, number] = [x + width / 2, y - height / 2];
		const bottomLeft: [number, number] = [x - width / 2, y + height / 2];
		const bottomRight: [number, number] = [x + width / 2, y + height / 2];

		let isTopLeftInside = false;
		let isTopRightInside = false;
		let isBottomLeftInside = false;
		let isBottomRightInside = false;

		const isPointInside = (point: [number, number], roadTopLeft: [number, number], roadBottomRight: [number, number]) => {
			return point[0] > roadTopLeft[0] && point[1] > roadTopLeft[1] && point[0] < roadBottomRight[0] && point[1] < roadBottomRight[1];
		};

		window.game
			?.getWorld()
			.getGameObjects()
			.filter((obj) => obj instanceof Road)
			.forEach((object) => {
				const objectScale = object.getScale();
				const objectX = object.getX();
				const objectY = object.getY();
				const objectWidth = object.getWidth() * objectScale;
				const objectHeight = object.getHeight() * objectScale;

				const roadTopLeft: [number, number] = [objectX - objectWidth / 2, objectY - objectHeight / 2];
				const roadBottomRight: [number, number] = [objectX + objectWidth / 2, objectY + objectHeight / 2];

				if (!isTopLeftInside) isTopLeftInside = isPointInside(topLeft, roadTopLeft, roadBottomRight);
				if (!isTopRightInside) isTopRightInside = isPointInside(topRight, roadTopLeft, roadBottomRight);
				if (!isBottomLeftInside) isBottomLeftInside = isPointInside(bottomLeft, roadTopLeft, roadBottomRight);
				if (!isBottomRightInside) isBottomRightInside = isPointInside(bottomRight, roadTopLeft, roadBottomRight);
			});

		return {
			topLeft: isTopLeftInside,
			topRight: isTopRightInside,
			bottomLeft: isBottomLeftInside,
			bottomRight: isBottomRightInside,
		};
	}
}

export default Player;
