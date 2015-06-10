import Array2D from './Array2D';

const NEIGHBORS = [
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, -1],
	[0, 1],
	[1, -1],
	[1, 0],
	[1, 1]
];

const PENTOMINO = [
	[-1, 0],
	[0, 0],
	[0, 1],
	[0, -1],
	[1, -1]
];

const ACORN = [
	[0, 0],
	[1, 0],
	[1, -2],
	[3, -1],
	[4, 0],
	[5, 0],
	[6, 0]
];

const LIVE = 'LIVE';
const DEAD = 'DEAD';

let makeCell = (x, y, state, neighbors=null) => {
	return {x, y, state, neighbors};
}

Object.values = (obj) => {
	return Object.keys(obj).map((key) => { return obj[key] });
}

export default class GameOfLife {
	constructor(width, height, cells = {}, diff = null) {
		this.width = width;
		this.height = height;
		this.cells = cells;
		this.diff = diff;
	} 

	getDiff() {
		return this.diff || Object.values(this.cells);
	}

	xytoi(x, y) {
		return y * this.width + x;
	}

	tick() {
		let cells = this.cells;
		let diff = [];
		let workingSet = {};
		let newCells = {};

		let touchCell = (x, y) => {
			if (x > 0 && x < this.width && y > 0 && y < this.height) {
				let idx = this.xytoi(x, y)
				if (!workingSet[idx]) {
					workingSet[idx] = makeCell(x, y, cells[idx] ? LIVE : DEAD, 0);
				}
				workingSet[idx].neighbors += 1;
			}
		}

		let touchNeighbors = (cell) => {
			NEIGHBORS.forEach((delta) => {
				let [dx, dy] = delta;
				touchCell(cell.x + dx, cell.y + dy);
			});
		}

		let pushLive = (x, y) => {
			newCells[this.xytoi(x, y)] = makeCell(x, y, LIVE);
		}

		let pushChange = (x, y, state) => {
			diff.push(makeCell(x, y, state));
		}

		// create the set of all cells with 1 or more neighbors

		Object.values(cells).forEach((cell) => {
			touchNeighbors(cell);
		})

		// calculate the new set of live cells and the collection of cells that have changed

		Object.values(workingSet).forEach((cell) => {
			if (cell.state == DEAD && cell.neighbors == 3) {
				pushChange(cell.x, cell.y, GameOfLife.LIVE);
				pushLive(cell.x, cell.y);
			}

			else if (cell.state == LIVE) {
				if (cell.neighbors < 2 || cell.neighbors > 3) {
					pushChange(cell.x, cell.y, GameOfLife.DEAD);
				}

				else {
					pushLive(cell.x, cell.y);
				}
			}
		})

		return new GameOfLife(
			this.width,
			this.height,
			newCells,
			diff
		);

	}

	addShape(x, y, deltas) {
		deltas.forEach((pair) => {
			let [dx, dy] = pair;
			let nx = x + dx;
			let ny = y + dy;
			let idx = this.xytoi(nx, ny);
			this.cells[idx] = makeCell(nx, ny, LIVE);
		});
	} 

	addPentomino(x, y) {
		this.addShape(x, y, PENTOMINO);
	}

	addAcorn(x, y) {
		this.addShape(x, y, ACORN);
	}
}

GameOfLife.DEAD = LIVE;
GameOfLife.LIVE = DEAD;

window.GOL = GameOfLife;