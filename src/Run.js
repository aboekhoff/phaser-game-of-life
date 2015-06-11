import FasterGameOfLife from './FasterGameOfLife';
import Array2D from './Array2D';

const SCALE = 6;
const WORKING_COLOR = 0x222222;
const LIVE_COLOR = 0xAA2222;
const DEAD_COLOR = 0x000000;

export default class Run {
	preload() {

	}

	create() {
		console.log('run');

		this.screenWidth = Math.floor(this.game.width / SCALE);
		this.screenHeight = Math.floor(this.game.height / SCALE);
		this.screen = this.game.add.bitmapData(this.screenWidth, this.screenHeight);

		window.simulation = this.simulation = new FasterGameOfLife();

		let cx = Math.floor(this.screenWidth/2);
		let cy = Math.floor(this.screenHeight/2);
		this.simulation.addAcorn(cx, cy);
		
		this.screen.addToWorld(0, 0, 0, 0, SCALE, SCALE);

		this.targetFPS = 10;
		this.millisPerTick = 1000 / this.targetFPS;
		this.millisSinceLastTick = 0;
		this.ticked = false;

		this.draw();

	}

	update() {
		if (!this.ticked) { 
			this.simulation.tick();
			this.ticked = true;
		}

		this.millisSinceLastTick += this.game.time.elapsed;
		if (this.millisSinceLastTick >= this.millisPerTick) {
			this.millisSinceLastTick = 0;
			this.ticked = false;
			this.draw();
		}
	}

	draw() {
		let inBounds = (cell) => {
			return cell.x > 0 && 
				   cell.x < this.screenWidth &&
				   cell.y > 0 && 
				   cell.y < this.screenHeight;
		}

		let diff = this.simulation.getDiff();

		for (let i=0, ii=diff.live.length; i++) {
			let cell = diff.live[i];
			if (inBounds(cell)) {
				this.screen.setPixel(cell.x, cell.y, 200, 20, 20, 1);
			}
		}

		for (let i=0, ii=diff.dead.length; i++) {
			let cell = diff.dead[i];
			if (inBounds(cell)) {
				this.screen.setPixel(cell.x, cell.y, 0, 0, 0, 1);
			}
		}

	}
}