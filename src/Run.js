import FasterGameOfLife from './FasterGameOfLife';
import Array2D from './Array2D';

const SCALE = 16;
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
		this.frontBuffer = this.game.add.bitmapData(this.screenWidth, this.screenHeight);
		this.backBuffer = this.frontBuffer.copy();

		window.simulation = this.simulation = new FasterGameOfLife();

		let cx = Math.floor(this.screenWidth/2);
		let cy = Math.floor(this.screenHeight/2);
		this.simulation.addAcorn(cx, cy);

		this.targetFPS = 10;
		this.millisPerTick = 1000 / this.targetFPS;
		this.millisSinceLastTick = 0;
		this.ticked = false;
		this.rendered = false;

		this.renderToBackBuffer();
		this.flipBuffers();

	}

	tick() {
		this.simulation.tick();
		this.ticked = true;
	}
	
	update() {
		if (!this.ticked) { 
			this.simulation.tick();
			this.ticked = true;
			return;
		}

		else if (!this.rendered) {
			this.renderToBackBuffer();
			return;
		}

		this.millisSinceLastTick += this.game.time.elapsed;
		if (this.millisSinceLastTick >= this.millisPerTick) {
			this.millisSinceLastTick = 0;
			this.ticked = false;
			this.rendered = false;
			this.flipBuffers();
		}
	}

	flipBuffers() {
		this.frontBuffer = this.backBuffer;
		this.backBuffer = this.frontBuffer.copy();
		this.frontBuffer.addToWorld(0, 0, 0, 0, SCALE, SCALE);
	}

	renderToBackBuffer() {
		let inBounds = (cell) => {
			return cell.x > 0 && 
				   cell.x < this.screenWidth &&
				   cell.y > 0 && 
				   cell.y < this.screenHeight;
		}

		let diff = this.simulation.getDiff();

		for (let i=0, ii=diff.live.length; i<ii; i++) {
			let cell = diff.live[i];
			if (inBounds(cell)) {
				this.backBuffer.setPixel(cell.x, cell.y, 20, 200, 200, 1);
			}
		}

		for (let i=0, ii=diff.dead.length; i<ii; i++) {
			let cell = diff.dead[i];
			if (inBounds(cell)) {
				this.backBuffer.setPixel(cell.x, cell.y, 0, 0, 0, 1);
			}
		}

		this.rendered = true;

	}
}