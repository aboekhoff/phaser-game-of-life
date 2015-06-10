import FasterGameOfLife from './FasterGameOfLife';
import Array2D from './Array2D';

const fontSize = 8;
const style = {font: fontSize + "px monospace", fill: "#fff"}

export default class Run {
	preload() {

	}

	create() {
		this.screenWidth = Math.floor(this.game.width / fontSize);
		this.screenHeight = Math.floor(this.game.height / fontSize);

		window.simulation = this.simulation = new FasterGameOfLife();

		let cx = Math.floor(this.screenWidth/2);
		let cy = Math.floor(this.screenHeight/2);
		
		this.simulation.addAcorn(cx, cy);

		this.screen = new Array2D(this.screenWidth, this.screenHeight);
		for (let x = 0; x<this.screenWidth; x++) {
			for (let y = 0; y<this.screenHeight; y++) {
				this.screen.set(x, y, this.game.add.text(x * fontSize, y * fontSize, ' ', style));
			}
		}

		this.draw();

		console.log(simulation);

	}

	update() {
		this.simulation.tick();
		this.draw();
		// this.simulation.tick();
		// console.log(this.simulation);
		// this.draw();
	}

	draw() {
		let inBounds = (cell) => {
			return cell.x > 0 && 
				   cell.x < this.screenWidth &&
				   cell.y > 0 && 
				   cell.y < this.screenHeight;
		}

		let diff = this.simulation.getDiff();

		diff.live.forEach((cell) => {
			if (inBounds(cell)) {
				this.screen.get(cell.x, cell.y).setText('*');
			} 
		})

		diff.dead.forEach((cell) => {
			if (inBounds(cell)) {
				this.screen.get(cell.x, cell.y).setText(' ');
			}
		})

	}
}