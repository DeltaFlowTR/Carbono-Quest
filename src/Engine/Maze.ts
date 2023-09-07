interface Cell {
    visited: boolean,
    backCellIndex: number,
    index: number
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
        for(let i = 0; i < this.mazeSize * this.mazeSize; i++) {
            this.cells[i] = { 
                visited: false,
                backCellIndex: -1, 
                index: i
            };
        }

        let currentCell = this.cells[Math.floor(Math.random() * this.cells.length)];
        currentCell.visited = true;

        while(true) {
            let result = this.visitNextCell(currentCell);
            currentCell = result.cell;

            if(currentCell.backCellIndex === -1) break;
        }

        console.log(this.cells);
    }

    private visitNextCell(currentCell: Cell): { comingBack: boolean, cell: Cell} {
        const neighbors = this.getNeighbors(currentCell).filter(cell => cell && !cell.visited);
        
        if(neighbors.length === 0) {
            return { comingBack: true, cell: this.cells[currentCell.backCellIndex] };
        }

        const nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];
        
        nextCell.visited = true;
        nextCell.backCellIndex = currentCell.index;
        
        return { comingBack: false, cell: nextCell };
    }

    private getNeighbors(cell: Cell): Array<Cell> {
        const north = this.cells[cell.index - this.mazeSize];
        const south = this.cells[cell.index + this.mazeSize];
        const east = this.cells[cell.index + 1];
        const west = this.cells[cell.index - 1];

        return [north, south, east, west];
    }
}

export default Maze;