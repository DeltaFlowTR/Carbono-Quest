import Maze from './Engine/Maze';
import Building from './Engine/Objects/Building';
import Road, { RoadDirection } from './Engine/Objects/Road';
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

		this.constructMaze(13);

		window.addEventListener('keypress', (event) => {
			if (event.key == 'p') window.debugInfoEnabled = !window.debugInfoEnabled;
		});

		window.game = this;
	}

	private constructMaze(mazeSize: number): void {
		const spriteSize = 64;
		const buildingScaleIncrease = 2;
		const roadScale = 5;
		const buildingScale = roadScale + buildingScaleIncrease;
		const spacingScale = 2;

		const maze = new Maze(mazeSize);
		maze.generate();

		const cells = maze.getCells();

		const startPosition = -(spriteSize * roadScale * ((mazeSize * 3 - 3) / 2));

		for (let cell of cells) {
			const i = cell.index;
			const collumn = Math.floor(i / mazeSize);

			const horizontalIndex = i - collumn * mazeSize;

			const x = startPosition + spacingScale * horizontalIndex * (spriteSize * roadScale) + spriteSize * roadScale * horizontalIndex;
			const y = startPosition + spacingScale * collumn * (spriteSize * roadScale) + spriteSize * roadScale * collumn;

			let roadDirection: RoadDirection = 'HORIZONTAL';

			if (cell.north || (cell.south && !cell.west && !cell.east)) roadDirection = 'VERTICAL';
			if ((!cell.north && !cell.south && cell.west) || cell.east) roadDirection = 'HORIZONTAL';
			if (cell.north && !cell.south && cell.west && !cell.east) roadDirection = 'TOP_LEFT';
			if (cell.north && !cell.south && !cell.west && cell.east) roadDirection = 'TOP_RIGHT';
			if (!cell.north && cell.south && cell.west && !cell.east) roadDirection = 'BOTTOM_LEFT';
			if (!cell.north && cell.south && !cell.west && cell.east) roadDirection = 'BOTTOM_RIGHT';
			if (cell.north && cell.south && cell.west && !cell.east) roadDirection = 'THREE_WAY_LEFT';
			if (cell.north && cell.south && !cell.west && cell.east) roadDirection = 'THREE_WAY_RIGHT';
			if (cell.north && !cell.south && cell.west && cell.east) roadDirection = 'THREE_WAY_TOP';
			if (!cell.north && cell.south && cell.west && cell.east) roadDirection = 'THREE_WAY_BOTTOM';

			this.world.addGameObject(new Road(x, y, roadScale, spriteSize, roadDirection));

			this.world.addGameObject(
				new Building(x - roadScale * spriteSize, y - (buildingScale - buildingScaleIncrease / 2) * spriteSize, buildingScale)
			);
			this.world.addGameObject(
				new Building(x + roadScale * spriteSize, y - (buildingScale - buildingScaleIncrease / 2) * spriteSize, buildingScale)
			);

			if (cell.north) this.world.addGameObject(new Road(x, y - roadScale * spriteSize, roadScale, spriteSize, 'VERTICAL'));
			else this.world.addGameObject(new Building(x, y - (buildingScale - buildingScaleIncrease / 2) * spriteSize, buildingScale));

			if (cell.south) this.world.addGameObject(new Road(x, y + roadScale * spriteSize, roadScale, spriteSize, 'VERTICAL'));
			else this.world.addGameObject(new Building(x, y + (buildingScale - buildingScaleIncrease / 2) * spriteSize, buildingScale));

			if (cell.west) this.world.addGameObject(new Road(x - roadScale * spriteSize, y, roadScale, spriteSize, 'HORIZONTAL'));
			else this.world.addGameObject(new Building(x - roadScale * spriteSize, y, buildingScale));

			if (cell.east) this.world.addGameObject(new Road(x + roadScale * spriteSize, y, roadScale, spriteSize, 'HORIZONTAL'));
			else this.world.addGameObject(new Building(x + roadScale * spriteSize, y, buildingScale));

			this.world.addGameObject(
				new Building(x - roadScale * spriteSize, y + (buildingScale - buildingScaleIncrease / 2) * spriteSize, buildingScale)
			);
			this.world.addGameObject(
				new Building(x + roadScale * spriteSize, y + (buildingScale - buildingScaleIncrease / 2) * spriteSize, buildingScale)
			);
		}
	}

	public getWorld() {
		return this.world;
	}
}

export default Game;
export { Vector2f };
