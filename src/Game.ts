import Maze from './Engine/Maze';
import World from './Engine/World';
import Player from './Player';
import Renderer from './renderer/Renderer';

interface Vector2f {
	x: number;
	y: number;
}

class Game {
	private readonly world: World;

	constructor() {
		window.player = new Player();
		window.renderer = new Renderer();
		window.debugInfoEnabled = false;

		this.world = new World();

		let maze = new Maze(20);
		maze.generate();

		window.addEventListener('keypress', (event) => {
			if (event.key == 'p') window.debugInfoEnabled = !window.debugInfoEnabled;
		});
	}

	public getWorld() {
		return this.world;
	}
}

export default Game;
export { Vector2f };
