import FasterGameOfLife from './FasterGameOfLife';
import Array2D from './Array2D';

const textureSize = 2;

export default class Run {
	preload() {

	}

	create() {
		this.screenWidth = Math.floor(this.game.width / textureSize);
		this.screenHeight = Math.floor(this.game.height / textureSize);

		window.simulation = this.simulation = new FasterGameOfLife();

		let cx = Math.floor(this.screenWidth/2);
		let cy = Math.floor(this.screenHeight/2);
		
		this.simulation.addAcorn(cx, cy);

		this.liveTexture = this.game.add.bitmapData(textureSize, textureSize);
		this.liveTexture.fill(220, 20, 20, 1);

		this.deadTexture = this.game.add.bitmapData(textureSize, textureSize);
		this.deadTexture.fill(0, 0, 0, 1);
		
		this.millisPerTick = 140;
		this.millisSinceLastTick = 0;

		this.draw();
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

		diff.live.forEach((cell) => {
			if (inBounds(cell)) {
				this.game.add.sprite(cell.x * textureSize, cell.y * textureSize, this.liveTexture);
			} 
		})

		diff.dead.forEach((cell) => {
			if (inBounds(cell)) {
				this.game.add.sprite(cell.x * textureSize, cell.y * textureSize, this.deadTexture);
			}
		})

	}
}