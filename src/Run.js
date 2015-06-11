import FasterGameOfLife from './FasterGameOfLife';
import Array2D from './Array2D';

const SIZE = 8;
const WORKING_COLOR = 0x222222;
const LIVE_COLOR = 0xAA2222;
const DEAD_COLOR = 0x000000;

export default class Run {
	preload() {

	}

	create() {
		console.log('run');

		this.screenWidth = Math.floor(this.game.width / SIZE);
		this.screenHeight = Math.floor(this.game.height / SIZE);

		window.simulation = this.simulation = new FasterGameOfLife();

		let cx = Math.floor(this.screenWidth/2);
		let cy = Math.floor(this.screenHeight/2);
		
		this.simulation.addAcorn(cx, cy);

		this.game.add.sprite(0, 0, this.screen);

		this.millisPerTick = 125;
		this.millisSinceLastTick = 0;

		this.gfx = this.game.add.graphics(0, 0);

	}

	update() {
		this.millisSinceLastTick += this.game.time.elapsed;
		if (this.millisSinceLastTick >= this.millisPerTick) {
			this.millisSinceLastTick = 0;
			this.simulation.tick();
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

		diff.dead.forEach((cell) => {
			if (inBounds(cell)) {
				this.gfx.beginFill(DEAD_COLOR);
				this.gfx.drawRect(cell.x * SIZE, cell.y * SIZE, SIZE, SIZE);
				this.gfx.endFill();
			}
		})

		diff.live.forEach((cell) => {
			if (inBounds(cell)) {
				this.gfx.beginFill(LIVE_COLOR);
				this.gfx.drawRect(cell.x * SIZE, cell.y * SIZE, SIZE, SIZE);
				this.gfx.endFill();
			}
		})

	}
}