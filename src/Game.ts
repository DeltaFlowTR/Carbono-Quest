import GameItem from './Engine/GameItem.js';
import GameObject from './Engine/GameObject.js';
import World from './Engine/World.js';
import Player from './Player.js';
import Canvas from './renderer/Canvas.js';
import Renderer from './renderer/Renderer.js';

interface Vector2f {
	x: number,
	y: number
}

class Game {
	private readonly world: World;

	constructor() {
		window.player = new Player();
		window.renderer = new Renderer(this);
		window.developmentInformationsEnabled = false;
		window.ticksPerSecond = 0;

		this.world = new World();

		// this.objects.push(new GameItem(500, 500, 50, 50, 1));

		window.addEventListener('keypress', (event) => {
			if (event.key == 'p') window.developmentInformationsEnabled = !window.developmentInformationsEnabled;
		});
	}

	public getWorld() {
		return this.world;
	}
}

export default Game;
export { Vector2f }
