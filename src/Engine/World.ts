import { Vector2f } from '../Game';
import Canvas from '../renderer/Canvas';
import GameItem from './GameItem';
import GameObject from './GameObject';
import ITickable from './ITickable';
import Road from './Objects/Road';

class World {
	private readonly tickInterval = (1 / 60) * 1000;

	private ticksPerSecond: number = 0;

	private framesPerSecond: number = 0;
	private displayFramesPerSecond: number = 0;

	private lastFpsUpdateTime: number = 0;

	private gameObjects: Array<GameObject>;

	constructor() {
		this.gameObjects = new Array<GameObject>();
		this.startTickLoop();
		this.render();
	}

	/**
	 * Method responsible for rendering the scene. This method should not be called directly, as it is already called by the constructor.
	 * This needs to be called just one time, after that a loop will start and will continue to render the scene automatically.
	 */
	public async render() {
		window.renderer.clear();

		const canvas = window.renderer.getCanvas();
		const canvasWidth = canvas.getWidth();
		const canvasHeight = canvas.getHeight();

		const items = this.gameObjects.filter((obj) => obj instanceof GameItem);
		const objects = this.gameObjects.filter((obj) => !(obj instanceof GameItem));

		const player = window.player;
		const worldOffset: Vector2f = { x: player.getX(), y: player.getY() };

		objects
			.filter((obj) => obj instanceof Road)
			.forEach((object) => {
				window.renderer.drawGameObject(object, worldOffset);
			});

		// Draw the shadow of all objects that have one
		this.gameObjects
			.filter((obj) => obj.hasShadow())
			.forEach((object) => {
				window.renderer.drawShadow(
					object.getX(),
					object.getY(),
					object.getHeight() * object.getScale(),
					object.getShadowScale(),
					worldOffset
				);
			});

		// Draw the player's shadow
		window.renderer.drawShadow(
			canvasWidth / 2,
			canvasHeight / 2,
			player.getHeight() * player.getScale(),
			player.getShadowScale(),
			{ x: 0, y: 0 },
			true
		);

		// Draws the game objects, exept for the player and roads
		objects
			.filter((obj) => !(obj instanceof Road))
			.forEach((object) => {
				window.renderer.drawGameObject(object, worldOffset);
			});

		this.renderPlayer();
		this.renderItems(items, worldOffset);

		if (window.debugInfoEnabled) this.renderDebugInfo(worldOffset);

		// Keeps track of the current frame rate
		if (Date.now() - this.lastFpsUpdateTime >= 1000) {
			this.displayFramesPerSecond = this.framesPerSecond;
			this.lastFpsUpdateTime = Date.now();
			this.framesPerSecond = 0;
		}

		this.framesPerSecond++;
		requestAnimationFrame(() => this.render());
	}

	private renderItems(items: Array<GameObject>, worldOffset: Vector2f) {
		items.forEach((object) => {
			window.renderer.drawGameObject(object, worldOffset);
		});
	}

	/**
	 * Draws all the debug information on the screen, that is: The hitboxes, the indentifiers, and the debug info on the top-left
	 * @param worldOffset The world offset used to create the illusion of camera
	 */
	private renderDebugInfo(worldOffset: Vector2f) {
		const renderer = window.renderer;

		// Draws all objects hitbox and identifiers, except for the player object and roads (roads are not necessary)
		this.gameObjects
			.filter((obj) => !(obj instanceof Road))
			.forEach((object) => {
				const width = object.getWidth() * object.getScale();
				const height = object.getHeight() * object.getScale();

				const convertedCoodinates = window.renderer.convertCoodinates(object.getX(), object.getY(), worldOffset);

				renderer.drawHitbox(object.getX(), object.getY(), width, height, worldOffset);
				renderer.drawText(
					object.getObjectIdentifier(),
					convertedCoodinates.x - width / 2,
					convertedCoodinates.y - height / 2 - 10,
					'Arial 20px'
				);
			});

		// Draw the player hitbox and identifier
		const canvas = window.renderer.getCanvas();
		const canvasWidth = canvas.getWidth();
		const canvasHeight = canvas.getHeight();

		const player = window.player;
		const width = player.getWidth() * player.getScale();
		const height = player.getHeight() * player.getScale();

		renderer.drawHitbox(canvasWidth / 2, canvasHeight / 2, width, height, { x: 0, y: 0 }, true);
		renderer.drawText(
			player.getObjectIdentifier(),
			canvasWidth / 2 - player.getWidth() / 2,
			canvasHeight / 2 - player.getHeight() / 2 - 20,
			'Arial 20'
		);

		// Draw the debug information on the top-left
		renderer.drawText(`X: ${window.player.getX()}`, 20, 30, '20px Arial');
		renderer.drawText(`Y: ${window.player.getY()}`, 20, 55, '20px Arial');
		renderer.drawText(`FPS: ${this.displayFramesPerSecond}`, 20, 80, '20px Arial');
		renderer.drawText(`TPS: ${this.ticksPerSecond}`, 20, 105, '20px Arial');
	}

	/**
	 * Draws the player at the center of the screen no matter it's position.
	 * This is because of the camera illusion, we render the player at the center fo the screen all the time and move the world around at the opposite direction
	 */
	private renderPlayer() {
		const player = window.player;
		const sprite = player.getSprite();
		const animator = player.getAnimator();

		const width = player.getWidth() * player.getScale();
		const height = player.getHeight() * player.getScale();

		const canvas = window.renderer.getCanvas();

		window.renderer.drawImage(sprite, animator.getCurrentFrame(), canvas.getWidth() / 2, canvas.getHeight() / 2, width, height);
	}

	/**
	 * Method responsible for updating all the game objects.
	 * This method should be called only one time, as it will start a loop that will continuously update the objects.
	 */
	private async startTickLoop() {
		const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

		let lastTPSUpdateMillis = Date.now();
		let tps = 0;
		while (true) {
			// TIcks all objects inside the game
			this.gameObjects.forEach((object) => {
				if (object.isTickable()) object.tick();
			});

			window.player.tick();

			if (Date.now() - lastTPSUpdateMillis > 1000) {
				this.ticksPerSecond = tps;
				lastTPSUpdateMillis = Date.now();
				tps = 0;
			}

			tps++;
			await wait(this.tickInterval);
		}
	}

	public addGameObject(gameObject: GameObject) {
		this.gameObjects.push(gameObject);
	}

	public getGameObjects() {
		return this.gameObjects;
	}
}

export default World;
