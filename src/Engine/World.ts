import { Vector2f } from '../Game';
import Canvas from '../renderer/Canvas';
import GameItem from './GameItem';
import GameObject from './GameObject';

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

		const lightBulb = new GameItem({
			x: 200,
			y: 200,
			width: 50,
			height: 50,
			objectSprite: Canvas.createSprite('img/Light-bulb.png'),
			objectIdentifier: 'LIGHT_BULB',
		});

		this.gameObjects.push(lightBulb);
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

		window.renderer.drawShadow(
			canvasWidth / 2,
			canvasHeight / 2,
			player.getHeight() * player.getScale(),
			player.getShadowScale(),
			{ x: 0, y: 0 },
			true
		);

		objects.forEach((object) => {
			window.renderer.renderGameObject(object, worldOffset);
		});

		this.renderPlayer();
		this.renderItems(items, worldOffset);

		if (window.debugInfoEnabled) this.renderDebugInfo(worldOffset);

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
			window.renderer.renderGameObject(object, worldOffset);
		});
	}

	private renderDebugInfo(worldOffset: Vector2f) {
		const renderer = window.renderer;

		this.gameObjects.forEach((object) => {
			const width = object.getWidth() * object.getScale();
			const height = object.getHeight() * object.getScale();

			const convertedCoodinates = window.renderer.convertCoodinates(object.getX(), object.getY(), worldOffset);

			renderer.drawHitbox(object.getX(), object.getY(), width, height, worldOffset);
			renderer.renderText(
				object.getObjectIdentifier(),
				convertedCoodinates.x - width / 2,
				convertedCoodinates.y - height / 2 - 10,
				'Arial 20px'
			);
		});

		const canvas = window.renderer.getCanvas();
		const canvasWidth = canvas.getWidth();
		const canvasHeight = canvas.getHeight();

		const player = window.player;
		const width = player.getWidth() * player.getScale();
		const height = player.getHeight() * player.getScale();

		renderer.drawHitbox(canvasWidth / 2, canvasHeight / 2, width, height, { x: 0, y: 0 }, true);
		renderer.renderText(
			player.getObjectIdentifier(),
			canvasWidth / 2 - player.getWidth() / 2,
			canvasHeight / 2 - player.getHeight() / 2 - 20,
			'Arial 20'
		);

		renderer.renderText(`X: ${window.player.getX()}`, 20, 30, '20px Arial');
		renderer.renderText(`Y: ${window.player.getY()}`, 20, 55, '20px Arial');
		renderer.renderText(`FPS: ${this.displayFramesPerSecond}`, 20, 80, '20px Arial');
		renderer.renderText(`TPS: ${this.ticksPerSecond}`, 20, 105, '20px Arial');
	}

	private renderPlayer() {
		const player = window.player;
		const sprite = player.getSprite();
		const animator = player.getAnimator();

		const width = player.getWidth() * player.getScale();
		const height = player.getHeight() * player.getScale();

		const canvas = window.renderer.getCanvas();

		window.renderer.renderImage(sprite, animator.getCurrentFrame(), canvas.getWidth() / 2, canvas.getHeight() / 2, width, height);
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

	public getGameObjects() {
		return this.gameObjects;
	}
}

export default World;
