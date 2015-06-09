import GameOfLife from './GameOfLife';
import Array2D from './Array2D';

const width = 640;
const height = 480;

const fontSize = 16;
const style = {font: fontSize + "px monospace", fill: "#fff"}

export default class Run {
	preload() {

	}

	create() {
		this.simulation = new GameOfLife(640/fontSize, 480/fontSize);
		this.screen = new Array2D(640/fontSize, 480/fontSize);
		this.draw();
	}


	update() {
		this.simulation.update();
		this.draw();
	}

	draw() {
		this.simulation.grid.forEach((content, x, y) => {
			if (content === GameOfLife.DEAD) {
				this.screen.get(x, y).setText(' ');
			} else {
				this.screen.get(x, y).setText('*');
			}
		})
		
	}
}