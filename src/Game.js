let game = new Phaser.Game(1400, 800, Phaser.AUTO);

import Boot from './Boot';
import Preload from './Preload';
import Intro from './Intro';
import Run from './Run';

game.state.add('boot', Boot);
game.state.add('preload', Preload);
game.state.add('intro', Intro);
game.state.add('run', Run);
game.state.start('boot');