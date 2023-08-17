import { Vector2f } from "../Game";
import Renderer from "../renderer/Renderer";
import GameItem from "./GameItem";
import GameObject from "./GameObject";

class World {
    private readonly tickInterval = (1 / 60) * 1000;

    private gameObjects: Array<GameObject>;

    constructor() {
        this.gameObjects = new Array<GameObject>();
        this.startTickLoop();
        this.render();
    }

    public async render() {
        window.renderer.clear();

        const items = this.gameObjects.filter(obj => obj instanceof GameItem);
        const objects = this.gameObjects.filter(obj => !(obj instanceof GameItem));

        const player = window.player;
        const worldOffset: Vector2f = { x: player.getX(), y: player.getY() }

        objects.forEach(object => {
            window.renderer.renderGameObject(object, worldOffset);
        });

        this.renderItems(items, worldOffset);

        this.renderPlayer();

        if(window.developmentInformationsEnabled) this.renderDevelopmentInfo();

        requestAnimationFrame(() => this.render());
    }

    private renderItems(items: Array<GameObject>, worldOffset: Vector2f) {
        items.forEach(object => {
            window.renderer.renderGameObject(object, worldOffset);
        });
    }

    private renderDevelopmentInfo() {

        this.gameObjects.forEach(object => {
            const width = object.getWidth() * object.getScale();
            const height = object.getHeight() * object.getScale();

            window.renderer.drawHitbox(object.getX(), object.getY(), width, height);
        });

        const canvas = window.renderer.getCanvas();
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();

        const player = window.player;
        const width = player.getWidth() * player.getScale();
        const height = player.getHeight() * player.getScale();

        window.renderer.drawHitbox(canvasWidth / 2, canvasHeight / 2, width, height);

        window.renderer.renderText(`X: ${window.player.getX()}`, 20, 30, "25px Arial");
        window.renderer.renderText(`Y: ${window.player.getY()}`, 20, 60, "25px Arial");
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

			tps++;

			if (Date.now() - lastTPSUpdateMillis > 1000) {
				window.ticksPerSecond = tps;
				lastTPSUpdateMillis = Date.now();
				tps = 0;
			}

			await wait(this.tickInterval);
		}
	}

    public getGameObjects() {
        return this.gameObjects;
    }
}

export default World;