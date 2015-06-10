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

class Cell {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.index = this.x + ',' + this.y;
	}

	toString() {
		return this.index;
	}
}

export default class FasterGameOfLife {
	constructor() {
		this.cellIndex = {};
		this.diff = {live: [], dead: []}
	}

	getDiff() {
		return this.diff;
	}

	neighborhoodOf(cell) {
		let neighborhood = [];
		for (let dx = -1; dx<=1; dx++) {
			for (let dy = -1; dy <=1; dy++) {
				neighborhood.push(
					new Cell(cell.x + dx, cell.y + dy)
				);
			}
		}
		return neighborhood;
	}

	lookupIndexOf(cell) {
		let index = 0;
		let neighborhood = this.neighborhoodOf(cell);
		for (let i=0; i<9; i++) {
			if (this.cellIndex[neighborhood[i]]) {
				index |= 1 << i;
			}
		}
		return index;
	}

	isLive(cell) {
		return this.cellIndex[cell];
	}

	willLive(cell) {
		return TABLE[this.lookupIndexOf(cell)];
	}

	getWorkingSet() {
		let seen = {};
		let workingSet = []; 
		this.cells.forEach((cell) => {
			this.neighborhoodOf(cell).forEach((cell) => {
				if (cell && !seen[cell]) {
					seen[cell] = true;
					workingSet.push(cell);
				}
			});
		});
		return workingSet;
	}

	tick() {
		let newCells = [];
		let newCellIndex = {};
		let diff = {
			live: [],
			dead: []
		}

		let workingSet = this.getWorkingSet();

		workingSet.forEach((cell) => {
			let isLive = this.isLive(cell);
			let willLive = this.willLive(cell);
			if (willLive) {
				newCells.push(cell);
				newCellIndex[cell] = true;
				if (!isLive) {
					diff.live.push(cell)
				}
			} else if (isLive) {
				diff.dead.push(cell)
			}
		})

		this.cellIndex = newCellIndex;
		this.diff = diff;

	}

	addShape(x, y, deltas) {
		deltas.forEach((delta) => {
			let [dx, dy] = delta;
			let cell = new Cell(x + dx, y + dy);
			this.cells.push(cell);
			this.cellIndex[cell] = true;
		})
		return this;
	}

	addAcorn(x, y) {
		return this.addShape(x, y, ACORN);
	}

	addPentomino(x, y) {
		return this.addShape(x, y, PENTOMINO);
	}

}

const TABLE = (() => {
	let size = 9*8*7*6*5*4*3*2*1;
	let table = Array(size);

	let evaluate = (n) => {
		let neighbors = 0
		let cell = 0
		
		for (let i=0; i<4; i++) {
			if (n & 1) { neighbors++; }
			n = n >> 1;
		}

		cell = (n & 1);
		n = n >> 1;

		for (let i=0; i<4; i++) {
			if (n & 1) { neighbors++; }
			n = n >> 1;
		}

		if ((cell === 0 && neighbors === 3) ||
			(cell === 1 && (neighbors === 2 || neighbors === 3))) {
			return 1;
		}

		else {
			return 0;
		}

	}

	for (let i=0; i<size; i++) {
		table[i] = evaluate(i);
	}

	return table;
})();