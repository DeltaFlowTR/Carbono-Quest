import { Vector2f } from '../Game';
import GameItem from './GameItem';
import GameObject from './GameObject';
import Building from './Objects/Building';
import Road from './Objects/Road';

class World {
	public static readonly totalItemCount: number = 20;
	private readonly tickInterval = (1 / 60) * 1000;

	private readonly timerDisplay = document.getElementById('timer') as HTMLHeadingElement;
	private readonly goodItemsCounter = document.getElementById('good-item-counter') as HTMLHeadingElement;
	private readonly badItemsCounter = document.getElementById('bad-item-counter') as HTMLHeadingElement;

	private readonly itemName = document.getElementById('item-name') as HTMLHeadingElement;
	private readonly itemDescription = document.getElementById('item-description') as HTMLParagraphElement;
	private readonly itemPopup = document.getElementById('item-popup') as HTMLDivElement

	private ticksPerSecond: number = 0;

	private framesPerSecond: number = 0;
	private displayFramesPerSecond: number = 0;

	private lastFpsUpdateTime: number = 0;

	private gameObjects: Array<GameObject>;

	private goodItensPicked: number = 0;
	private badItensPicked: number = 0;

	private timeRemaining: number = 2.5 * 60;
	private running = true;

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
				if (!this.isInsideScreen(object)) return;
				window.renderer.drawGameObject(object, worldOffset);
			});

		// Draw the shadow of all objects that have one
		this.gameObjects
			.filter((obj) => obj.hasShadow())
			.forEach((object) => {
				if (!this.isInsideScreen(object)) return;
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
				if (!this.isInsideScreen(object)) return;
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
			.filter((obj) => !(obj instanceof Road) && !(obj instanceof Building))
			.forEach((object) => {
				if (!this.isInsideScreen(object)) return;

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
			if (!this.running) return;

			// Ticks all objects inside the game
			this.gameObjects.forEach((object) => {
				if (object.isTickable()) object.tick();
			});

			window.player.tick();

			const collidingItem = this.gameObjects
				.filter((obj) => obj instanceof GameItem)
				.find((object) => this.checkObjectCollision(window.player, object)) as GameItem;
			if (collidingItem) {
				this.gameObjects.splice(this.gameObjects.indexOf(collidingItem), 1);

				if (collidingItem.isGood()) this.goodItensPicked += 1;
				else this.badItensPicked += 1;

				this.goodItemsCounter.innerText = this.goodItensPicked.toString();
				this.badItemsCounter.innerText = this.badItensPicked.toString();

				this.itemName.innerText = collidingItem.getName();
				this.itemDescription.innerText = collidingItem.getDescription();

				this.itemPopup.classList.add("shown");
				setTimeout(() => this.itemPopup.classList.remove("shown"), 10000);
			}

			if (Date.now() - lastTPSUpdateMillis > 1000) {
				this.ticksPerSecond = tps;
				lastTPSUpdateMillis = Date.now();
				tps = 0;

				this.timeRemaining -= 1;

				const minutes = Math.floor(this.timeRemaining / 60);
				const seconds = this.timeRemaining - minutes * 60;

				this.timerDisplay.innerText = `0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

				if (minutes == 0 && seconds == 0) {
					this.running = false;
					window.game.endGame(this.goodItensPicked, this.badItensPicked);
				}
			}

			tps++;
			await wait(this.tickInterval);
		}
	}

	/**
	 * Checks if the first object is inside the second one
	 * @param objectOne The first object
	 * @param objectTwo The second object
	 * @returns True if the first object is inside the second, false otherwise
	 */
	public checkObjectCollision(objectOne: GameObject, objectTwo: GameObject) {
		const oneX = objectOne.getX();
		const oneY = objectOne.getY();
		const oneScale = objectOne.getScale();
		const oneWidth = objectOne.getWidth() * oneScale;
		const oneHeight = objectOne.getHeight() * oneScale;

		const oneTopLeft = [oneX - oneWidth / 2, oneY - oneHeight / 2];
		const oneBottomRight = [oneX + oneWidth / 2, oneY + oneHeight / 2];

		const twoX = objectTwo.getX();
		const twoY = objectTwo.getY();
		const twoScale = objectTwo.getScale();
		const twoWidth = objectTwo.getWidth() * twoScale;
		const twoHeight = objectTwo.getHeight() * twoScale;

		const twoTopLeft = [twoX - twoWidth / 2, twoY - twoHeight / 2];
		const twoBottomRight = [twoX + twoWidth / 2, twoY + twoHeight / 2];

		const topLeftInside =
			oneTopLeft[0] > twoTopLeft[0] && oneTopLeft[1] > twoTopLeft[1] && oneTopLeft[0] < twoBottomRight[0] && oneTopLeft[1] < twoBottomRight[1];
		const bottomRightInside =
			oneBottomRight[0] > twoTopLeft[0] &&
			oneBottomRight[1] > twoTopLeft[1] &&
			oneBottomRight[0] < twoBottomRight[0] &&
			oneBottomRight[1] < twoBottomRight[1];

		return topLeftInside || bottomRightInside;
	}

	/**
	 * Checks if the object is within theplayer screen. Used to render only objects that are visible
	 * @param object The object to check
	 * @returns True if within the player screen, false otherwise
	 */
	private isInsideScreen(object: GameObject) {
		const scale = object.getScale();
		const x = object.getX();
		const y = object.getY();
		const width = object.getWidth() * scale;
		const height = object.getHeight() * scale;

		const playerX = window.player.getX();
		const playerY = window.player.getY();

		const screenTopLeft = [playerX - 1920 / 2, playerY - 1080 / 2];
		const screenBottomRight = [playerX + 1920 / 2, playerY + 1080 / 2];

		const topLeft = [x - width / 2, y - height / 2];
		const topRight = [x + width / 2, y - height / 2];
		const bottomLeft = [x - width / 2, y + height / 2];
		const bottomRight = [x + width / 2, y + height / 2];

		const topLeftInside =
			topLeft[0] > screenTopLeft[0] && topLeft[0] < screenBottomRight[0] && topLeft[1] > screenTopLeft[1] && topLeft[1] < screenBottomRight[1];
		const topRightInside =
			topRight[0] > screenTopLeft[0] &&
			topRight[0] < screenBottomRight[0] &&
			topRight[1] > screenTopLeft[1] &&
			topRight[1] < screenBottomRight[1];
		const bottomLeftInside =
			bottomLeft[0] > screenTopLeft[0] &&
			bottomLeft[0] < screenBottomRight[0] &&
			bottomLeft[1] > screenTopLeft[1] &&
			bottomLeft[1] < screenBottomRight[1];
		const bottomRightInside =
			bottomRight[0] > screenTopLeft[0] &&
			bottomRight[0] < screenBottomRight[0] &&
			bottomRight[1] > screenTopLeft[1] &&
			bottomRight[1] < screenBottomRight[1];

		return topLeftInside || topRightInside || bottomLeftInside || bottomRightInside;
	}

	public addGameObject(gameObject: GameObject) {
		this.gameObjects.push(gameObject);
	}

	public getGameObjects() {
		return this.gameObjects;
	}
}

export default World;
