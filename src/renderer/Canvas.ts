class Canvas {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;

	constructor(canvasId: string) {
		this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
		this.context = this.canvas.getContext('2d');
	}

	public static createSprite(path: string) {
		const image = document.createElement('img');
		image.src = window.location.href + path;

		return image;
	}

	public static getSpriteSize(sprite: HTMLImageElement) {
		return { width: sprite.width, height: sprite.height };
	}

	public getContext() {
		return this.context;
	}

	public getWidth() {
		return this.canvas.width;
	}

	public getHeight() {
		return this.canvas.height;
	}

	public getSize() {
		return { width: this.getWidth(), height: this.getHeight() };
	}
}

export default Canvas;
