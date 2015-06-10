import GameOfLife from './GameOfLife';
import Array2D from './Array2D';

const fontSize = 8;
const style = {font: fontSize + "px monospace", fill: "#fff"}

export default class Run {
	preload() {

	}

	create() {
		let simWidth = this.game.width / fontSize;
		let simHeight = this.game.height / fontSize;

		this.simulation = new GameOfLife(simWidth, simHeight);

		let cx = Math.floor(this.simulation.width/2);
		let cy = Math.floor(this.simulation.height/2);

		//this.simulation.addPentomino(cx, cy);
		
		this.simulation.addAcorn(cx, cy);

		this.screen = new Array2D(simWidth, simHeight);
		for (let x = 0; x<simWidth; x++) {
			for (let y = 0; y<simHeight; y++) {
				this.screen.set(x, y, this.game.add.text(x * fontSize, y * fontSize, ' ', style));
			}
		}

		this.draw();
	}

	update() {
		this.simulation = this.simulation.tick();
		this.draw();
	}

	draw() {
		this.simulation.getDiff().forEach((cell) => {
			if (cell.state === GameOfLife.LIVE) {
				this.screen.get(cell.x, cell.y).setText('*');
			} else if (cell.state === GameOfLife.DEAD) {
				this.screen.get(cell.x, cell.y).setText(' ');
			} else {
				console.log('INVALID CELL: ', cell);
				throw Error('invalid cell');
			}
		});
		
	}
}