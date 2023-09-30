import GameItem from './Engine/GameItem';
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

	private readonly endBackdrop = document.getElementById('end-backdrop') as HTMLDivElement;
	private readonly endImage = document.getElementById('end-image') as HTMLImageElement;

	private goodEndingImage = 'img/Endings/Good.png';
	private badEndingImage = 'img/Endings/Bad.png';
	private neutralEndingImage = 'img/Endings/Neutral.png';

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

	public endGame(goodItensPicked: number, badItensPicked: number) {
		if (goodItensPicked > badItensPicked) {
			this.endBackdrop.classList.add('good', 'expanded');
			this.endImage.src = this.goodEndingImage;
		} else if (goodItensPicked < badItensPicked) {
			this.endBackdrop.classList.add('bad', 'expanded');
			this.endImage.src = this.badEndingImage;
		} else {
			this.endBackdrop.classList.add('neutral', 'expanded');
			this.endImage.src = this.neutralEndingImage;
		}
	}

	/**
	 * Constructs the city maze based on a given size
	 * @param mazeSize The size of the city
	 */
	private constructMaze(mazeSize: number): void {
		const spriteSize = 64;
		const buildingScaleIncrease = 3;
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

		const roads = this.getWorld()
			.getGameObjects()
			.filter((obj) => obj instanceof Road);
		const usedRoads: Road[] = [];

		const addItem = (index: number) => {
			const randomRoad = roads[Math.floor(Math.random() * roads.length)];

			if (!usedRoads.includes(randomRoad)) {
				this.world.addGameObject(new GameItem(randomRoad.getX(), randomRoad.getY(), 1.5, index, index < 10));
				usedRoads.push(randomRoad);
			} else addItem(index);
		};

		for (let i = 0; i < World.totalItemCount; i++) addItem(i);
	}

	public getWorld() {
		return this.world;
	}
}

export default Game;
export { Vector2f };
