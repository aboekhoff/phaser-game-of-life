export default class Intro {
	preload() {
	}

	create() {
		console.log('intro');
		let style = { font: "32px monospace", fill: "#fff"};
		this.game.add.text(240, 200, 'Automata', style);
		this.game.state.start('run');
	}

}