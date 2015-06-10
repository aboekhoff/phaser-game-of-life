export default class Intro {
	preload() {
	}

	create() {
		console.log('intro');
    let fontSize = 32;
		let style = { font: fontSize + "px monospace", fill: "#fff"};
    let text = 'Automata';
    let textSize = text.length * fontSize;
		this.game.add.text(this.game.width/2 - textSize/3, this.game.height/2 - fontSize * 4, 'Automata', style);
		this.game.state.start('run');
	}

}