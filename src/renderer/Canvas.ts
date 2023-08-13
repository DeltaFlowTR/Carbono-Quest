import GameItem from '../Engine/GameItem.js';
import GameObject from '../Engine/GameObject.js';
import Game from '../Game.js';

class Canvas {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private game: Game;
	private framesPerSecond: number = 0;
	private lastFPSUpdate: number = Date.now();
	private displayFPS: number = 0;

	constructor(canvasId: string, game: Game) {
		this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
		this.context = this.canvas.getContext('2d');
		this.game = game;

		this.render();
	}

	/**
	 * Method responsible for rendering the scene. This method should not be called directly, as it is already called by the constructor.
	 * This needs to be called just one time, after that a loop will start and will continue to render the scene automatically.
	 */
	public async render() {
		this.clear();

		// Render all the objects shadows so they appear bellow all the objects
		this.game
			.getGameObjects()
			.filter((obj) => obj.hasShadow())
			.forEach((object) => {
				object.drawShadow(this.context);
			});

		window.player.drawShadow(this.context);

		// Render all game objects, excluding the items
		this.game
			.getGameObjects()
			.filter((obj) => !(obj instanceof GameItem))
			.forEach((object) => {
				this.renderObject(object);
			});

		// Render the player
		this.renderObject(window.player);

		// Render all items, they are rendered after the other objects so the appear above them
		this.game
			.getGameObjects()
			.filter((obj) => obj instanceof GameItem)
			.forEach((object) => {
				this.renderObject(object);
			});

		if (window.developmentInformationsEnabled) {
			this.game.getGameObjects().forEach((object) => {
				this.context.save();
				object.drawHitbox(this.context);
				object.drawObjectIdentifier(this.context);
				this.context.restore();
			});

			window.player.drawHitbox(this.context);
			window.player.drawObjectIdentifier(this.context);

			this.context.save();

			this.context.fillStyle = 'black';
			this.context.font = '15px Arial';

			this.context.fillText(`X: ${window.player.getX()}`, 10, 20);
			this.context.fillText(`Y: ${window.player.getY()}`, 10, 40);
			this.context.fillText(`FPS: ${this.displayFPS}`, 10, 60);
			this.context.fillText(`TPS: ${window.ticksPerSecond}`, 10, 80);

			this.context.restore();
		}

		this.framesPerSecond++;

		if (Date.now() - this.lastFPSUpdate >= 1000) {
			this.displayFPS = this.framesPerSecond;
			this.framesPerSecond = 0;
			this.lastFPSUpdate = Date.now();
		}

		requestAnimationFrame(() => this.render());
	}

	private renderObject(object: GameObject) {
		this.context.save();
		object.render(this.context);

		this.context.restore();
	}

	public clear(): void {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	public static createSprite(path: string) {
		const image = document.createElement('img');
		image.src = window.location.href + path;

		return image;
	}
}

export default Canvas;
