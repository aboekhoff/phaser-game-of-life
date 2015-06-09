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

export default class GameOfLife {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.grid = new Array2D(width, height);
		this.grid.fill(GameOfLife.DEAD);
		this.addShape(Math.floor(width/2), Math.floor(height/2), PENTOMINO);
	} 

	update() {
		console.log('tick');
		var _grid = new Array2D(this.width, this.height);

		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				let c = this.grid.get(x, y);
				let n = this.neighbors(x, y);

				if (c == GameOfLife.DEAD && n == 3) {
					_grid.set(x, y, GameOfLife.LIVE)
				}

				else if (c == GameOfLife.LIVE && (n < 2 || n > 3)) {
					_grid.set(x, y, GameOfLife.DEAD)
				}

				else {
					_grid.set(x, y, c);
				}
			}
		}

		this.grid = _grid;
	}

	neighbors(x, y) {
		let n = 0;

		NEIGHBORS.forEach((pair) => {
			let [dx, dy] = pair;
			if (this.grid.get(x + dx, y + dy) == GameOfLife.LIVE) {
				n++;
			}
		});

		return n;
	}

	addShape(x, y, deltas) {
		deltas.forEach((pair) => {
			let [dx, dy] = pair;
			this.grid.set(x+dx, y+dy, GameOfLife.LIVE);
		})
	} 

	addPentomino(x, y) {
		this.addShape(x, y, PENTOMINO);
	}
}

GameOfLife.DEAD = 1
GameOfLife.LIVE = 2

window.GOL = GameOfLife;