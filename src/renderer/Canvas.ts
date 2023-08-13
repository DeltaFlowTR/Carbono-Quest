import Game from '../Game.js';

class Canvas {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private game: Game;

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

		this.game.getGameObjects().forEach((object) => {
			object.render(this.context);
		});

		window.player.render(this.context);

		requestAnimationFrame(() => this.render());
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
