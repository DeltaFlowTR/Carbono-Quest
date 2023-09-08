interface Cell {
	visited: boolean;
	backCellIndex: number;
	index: number;
	north: boolean;
	south: boolean;
	east: boolean;
	west: boolean;
}

class Maze {
	private cells: Array<Cell>;

	private mazeSize: number;

	constructor(mazeSize: number) {
		this.cells = [];

		this.mazeSize = mazeSize;
	}

	public generate(): void {
		this.cells = [];
		for (let i = 0; i < this.mazeSize * this.mazeSize; i++) {
			this.cells[i] = {
				visited: false,
				backCellIndex: -1,
				index: i,
				north: false,
				south: false,
				east: false,
				west: false,
			};
		}

		let currentCell = this.cells[Math.floor(Math.random() * this.cells.length)];
		currentCell.visited = true;

		while (true) {
			let result = this.visitNextCell(currentCell);
			currentCell = result.cell;

			if (currentCell.backCellIndex === -1) break;
		}
	}

	private visitNextCell(currentCell: Cell): { comingBack: boolean; cell: Cell } {
		const neighbors = this.getNeighbors(currentCell, this.mazeSize).filter((cell) => cell && !cell.visited);

		if (neighbors.length === 0) {
			return { comingBack: true, cell: this.cells[currentCell.backCellIndex] };
		}

		const nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];

		// Check what direction it chose
		switch (currentCell.index - nextCell.index) {
			case 1:
				nextCell.east = true;
				currentCell.west = true;
				break;

			case -1:
				nextCell.west = true;
				currentCell.east = true;
				break;

			case this.mazeSize:
				nextCell.south = true;
				currentCell.north = true;
				break;

			case -this.mazeSize:
				nextCell.north = true;
				currentCell.south = true;
				break;
		}

		nextCell.visited = true;
		nextCell.backCellIndex = currentCell.index;

		return { comingBack: false, cell: nextCell };
	}

	private getNeighbors(cell: Cell, mazeSize: number): Array<Cell> {
		const eastIndex = cell.index + 1;
		const westIndex = cell.index - 1;

		const north = this.cells[cell.index - this.mazeSize];
		const south = this.cells[cell.index + this.mazeSize];
		const east = Math.floor(eastIndex / mazeSize) === Math.floor(cell.index / mazeSize) ? this.cells[eastIndex] : undefined;
		const west = Math.floor(westIndex / mazeSize) === Math.floor(cell.index / mazeSize) ? this.cells[westIndex] : undefined;

		return [north, south, east, west];
	}

	public getCells(): Array<Cell> {
		return this.cells;
	}
}

export default Maze;
