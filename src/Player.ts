import GameObject from './Engine/GameObject.js';
import ITickable from './Engine/ITickable.js';
import Animator from './renderer/animation/Animator.js';
import GameAnimation from './renderer/animation/GameAnimation.js';
import Canvas from './renderer/Canvas.js';

/**
 * Represents the player inside the game. This class is responsible for handling
 * all the movimentation and interactions between the player and the game
 */
class Player extends GameObject implements ITickable {
	private readonly normalPlayerSpeed = 2.5;
	private readonly sprintPlayerSpeed = 4;

	private playerSpeed: number;

	private animator: Animator;

	private goingUp: boolean;
	private goingDown: boolean;
	private goingLeft: boolean;
	private goingRight: boolean;

	constructor() {
		super(100, 100, 34, 52, 1.5, "PLAYER");
		this.playerSpeed = this.normalPlayerSpeed;
		this.animator = new Animator(Canvas.createSprite('img/Character.png'), 'WalkDown');

		this.renderShadow = true;
		this.shadowScale = 0.7;

		const animationWalkUp = new GameAnimation(250, [
			{
				firstPosition: { x: 36, y: 0 },
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
			firstPosition: { x: 0, y: 160 },
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

		if (this.goingUp) this.y -= this.playerSpeed;
		if (this.goingDown) this.y += this.playerSpeed;
		if (this.goingLeft) this.x -= this.playerSpeed;
		if (this.goingRight) this.x += this.playerSpeed;

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

	public render(context: CanvasRenderingContext2D): void {
		this.animator.drawAnimationFrame(context, this.x, this.y, this.width * this.scale, this.height * this.scale);
	}

	public getX(): number {
		return this.x;
	}

	public getY(): number {
		return this.y;
	}
}

export default Player;
