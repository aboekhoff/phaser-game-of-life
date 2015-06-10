(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Array2D = (function () {
  function Array2D(width, height) {
    _classCallCheck(this, Array2D);

    this.width = width;
    this.height = height;
    this.content = new Array(width * height);
  }

  _createClass(Array2D, [{
    key: "get",
    value: function get(x, y) {
      return this.content[y * this.width + x];
    }
  }, {
    key: "getSquare",
    value: function getSquare(x, y, w, h) {
      var square = new Array2D(w, h);
      for (var i = 0; i < w; i++) {
        for (var j = 0; j < h; j++) {
          square.set(i, j, this.get(x + i, y + j));
        }
      }
    }
  }, {
    key: "set",
    value: function set(x, y, newVal) {
      this.content[y * this.width + x] = newVal;
      return this;
    }
  }, {
    key: "fill",
    value: function fill(content) {
      var _this = this;

      this.forEach(function (_, x, y) {
        _this.set(x, y, content);
      });
    }
  }, {
    key: "forEach",
    value: function forEach(callback) {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          callback(this.content[y * this.width + x], x, y);
        }
      }
    }
  }]);

  return Array2D;
})();

exports["default"] = Array2D;
module.exports = exports["default"];

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Boot = (function () {
	function Boot() {
		_classCallCheck(this, Boot);
	}

	_createClass(Boot, [{
		key: 'preload',
		value: function preload() {}
	}, {
		key: 'create',
		value: function create() {
			console.log('boot');
			this.game.state.start('preload');
		}
	}]);

	return Boot;
})();

exports['default'] = Boot;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Boot = require('./Boot');

var _Boot2 = _interopRequireDefault(_Boot);

var _Preload = require('./Preload');

var _Preload2 = _interopRequireDefault(_Preload);

var _Intro = require('./Intro');

var _Intro2 = _interopRequireDefault(_Intro);

var _Run = require('./Run');

var _Run2 = _interopRequireDefault(_Run);

var game = new Phaser.Game(1400, 800, Phaser.AUTO);

game.state.add('boot', _Boot2['default']);
game.state.add('preload', _Preload2['default']);
game.state.add('intro', _Intro2['default']);
game.state.add('run', _Run2['default']);
game.state.start('boot');

},{"./Boot":2,"./Intro":5,"./Preload":6,"./Run":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Array2D = require('./Array2D');

var _Array2D2 = _interopRequireDefault(_Array2D);

var NEIGHBORS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

var PENTOMINO = [[-1, 0], [0, 0], [0, 1], [0, -1], [1, -1]];

var ACORN = [[0, 0], [1, 0], [1, -2], [3, -1], [4, 0], [5, 0], [6, 0]];

var LIVE = 'LIVE';
var DEAD = 'DEAD';

var makeCell = function makeCell(x, y, state) {
	var neighbors = arguments[3] === undefined ? null : arguments[3];

	return { x: x, y: y, state: state, neighbors: neighbors };
};

Object.values = function (obj) {
	return Object.keys(obj).map(function (key) {
		return obj[key];
	});
};

var GameOfLife = (function () {
	function GameOfLife(width, height) {
		var cells = arguments[2] === undefined ? {} : arguments[2];
		var diff = arguments[3] === undefined ? null : arguments[3];

		_classCallCheck(this, GameOfLife);

		this.width = width;
		this.height = height;
		this.cells = cells;
		this.diff = diff;
	}

	_createClass(GameOfLife, [{
		key: 'getDiff',
		value: function getDiff() {
			return this.diff || Object.values(this.cells);
		}
	}, {
		key: 'xytoi',
		value: function xytoi(x, y) {
			return y * this.width + x;
		}
	}, {
		key: 'tick',
		value: function tick() {
			var _this = this;

			var cells = this.cells;
			var diff = [];
			var workingSet = {};
			var newCells = {};

			var touchCell = function touchCell(x, y) {
				if (x > 0 && x < _this.width && y > 0 && y < _this.height) {
					var idx = _this.xytoi(x, y);
					if (!workingSet[idx]) {
						workingSet[idx] = makeCell(x, y, cells[idx] ? LIVE : DEAD, 0);
					}
					workingSet[idx].neighbors += 1;
				}
			};

			var touchNeighbors = function touchNeighbors(cell) {
				NEIGHBORS.forEach(function (delta) {
					var _delta = _slicedToArray(delta, 2);

					var dx = _delta[0];
					var dy = _delta[1];

					touchCell(cell.x + dx, cell.y + dy);
				});
			};

			var pushLive = function pushLive(x, y) {
				newCells[_this.xytoi(x, y)] = makeCell(x, y, LIVE);
			};

			var pushChange = function pushChange(x, y, state) {
				diff.push(makeCell(x, y, state));
			};

			// create the set of all cells with 1 or more neighbors

			Object.values(cells).forEach(function (cell) {
				touchNeighbors(cell);
			});

			// calculate the new set of live cells and the collection of cells that have changed

			Object.values(workingSet).forEach(function (cell) {
				if (cell.state == DEAD && cell.neighbors == 3) {
					pushChange(cell.x, cell.y, GameOfLife.LIVE);
					pushLive(cell.x, cell.y);
				} else if (cell.state == LIVE) {
					if (cell.neighbors < 2 || cell.neighbors > 3) {
						pushChange(cell.x, cell.y, GameOfLife.DEAD);
					} else {
						pushLive(cell.x, cell.y);
					}
				}
			});

			return new GameOfLife(this.width, this.height, newCells, diff);
		}
	}, {
		key: 'addShape',
		value: function addShape(x, y, deltas) {
			var _this2 = this;

			deltas.forEach(function (pair) {
				var _pair = _slicedToArray(pair, 2);

				var dx = _pair[0];
				var dy = _pair[1];

				var nx = x + dx;
				var ny = y + dy;
				var idx = _this2.xytoi(nx, ny);
				_this2.cells[idx] = makeCell(nx, ny, LIVE);
			});
		}
	}, {
		key: 'addPentomino',
		value: function addPentomino(x, y) {
			this.addShape(x, y, PENTOMINO);
		}
	}, {
		key: 'addAcorn',
		value: function addAcorn(x, y) {
			this.addShape(x, y, ACORN);
		}
	}]);

	return GameOfLife;
})();

exports['default'] = GameOfLife;

GameOfLife.DEAD = LIVE;
GameOfLife.LIVE = DEAD;

window.GOL = GameOfLife;
module.exports = exports['default'];

},{"./Array2D":1}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Intro = (function () {
	function Intro() {
		_classCallCheck(this, Intro);
	}

	_createClass(Intro, [{
		key: "preload",
		value: function preload() {}
	}, {
		key: "create",
		value: function create() {
			console.log("intro");
			var fontSize = 32;
			var style = { font: fontSize + "px monospace", fill: "#fff" };
			var text = "Automata";
			var textSize = text.length * fontSize;
			this.game.add.text(this.game.width / 2 - textSize / 3, this.game.height / 2 - fontSize * 4, "Automata", style);
			this.game.state.start("run");
		}
	}]);

	return Intro;
})();

exports["default"] = Intro;
module.exports = exports["default"];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Preload = (function () {
	function Preload() {
		_classCallCheck(this, Preload);
	}

	_createClass(Preload, [{
		key: 'preload',
		value: function preload() {}
	}, {
		key: 'create',
		value: function create() {
			console.log('preload');
			this.game.state.start('intro');
		}
	}]);

	return Preload;
})();

exports['default'] = Preload;
module.exports = exports['default'];

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _GameOfLife = require('./GameOfLife');

var _GameOfLife2 = _interopRequireDefault(_GameOfLife);

var _Array2D = require('./Array2D');

var _Array2D2 = _interopRequireDefault(_Array2D);

var fontSize = 8;
var style = { font: fontSize + 'px monospace', fill: '#fff' };

var Run = (function () {
	function Run() {
		_classCallCheck(this, Run);
	}

	_createClass(Run, [{
		key: 'preload',
		value: function preload() {}
	}, {
		key: 'create',
		value: function create() {
			var simWidth = this.game.width / fontSize;
			var simHeight = this.game.height / fontSize;

			this.simulation = new _GameOfLife2['default'](simWidth, simHeight);

			var cx = Math.floor(this.simulation.width / 2);
			var cy = Math.floor(this.simulation.height / 2);

			//this.simulation.addPentomino(cx, cy);

			this.simulation.addAcorn(cx, cy);

			this.screen = new _Array2D2['default'](simWidth, simHeight);
			for (var x = 0; x < simWidth; x++) {
				for (var y = 0; y < simHeight; y++) {
					this.screen.set(x, y, this.game.add.text(x * fontSize, y * fontSize, ' ', style));
				}
			}

			this.draw();
		}
	}, {
		key: 'update',
		value: function update() {
			this.simulation = this.simulation.tick();
			this.draw();
		}
	}, {
		key: 'draw',
		value: function draw() {
			var _this = this;

			this.simulation.getDiff().forEach(function (cell) {
				if (cell.state === _GameOfLife2['default'].LIVE) {
					_this.screen.get(cell.x, cell.y).setText('*');
				} else if (cell.state === _GameOfLife2['default'].DEAD) {
					_this.screen.get(cell.x, cell.y).setText(' ');
				} else {
					console.log('INVALID CELL: ', cell);
					throw Error('invalid cell');
				}
			});
		}
	}]);

	return Run;
})();

exports['default'] = Run;
module.exports = exports['default'];

},{"./Array2D":1,"./GameOfLife":4}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0FycmF5MkQuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0Jvb3QuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0dhbWUuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0dhbWVPZkxpZmUuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0ludHJvLmpzIiwiL1VzZXJzL2Fib2VraG9mZi9Qcm9qZWN0cy9waGFzZXItZ2FtZS1vZi1saWZlL3NyYy9QcmVsb2FkLmpzIiwiL1VzZXJzL2Fib2VraG9mZi9Qcm9qZWN0cy9waGFzZXItZ2FtZS1vZi1saWZlL3NyYy9SdW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0lDQXFCLE9BQU87QUFDZixXQURRLE9BQU8sQ0FDZCxLQUFLLEVBQUUsTUFBTSxFQUFFOzBCQURSLE9BQU87O0FBRXhCLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFFBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFFBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0dBQzFDOztlQUxrQixPQUFPOztXQU92QixhQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDUixhQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDekM7OztXQUVRLG1C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QUFDbkMsV0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUM3QyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyx3QkFBVyxJQUFJLEVBQUU7QUFDMUMsV0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUM3QyxNQUFNO0FBQ04sWUFBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNwQyxXQUFNLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztLQUM1QjtJQUNELENBQUMsQ0FBQztHQUVIOzs7UUE3Q21CLEdBQUc7OztxQkFBSCxHQUFHIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFycmF5MkQge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuY29udGVudCA9IG5ldyBBcnJheSh3aWR0aCAqIGhlaWdodCk7XG4gIH1cblxuICBnZXQoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnRbeSAqIHRoaXMud2lkdGggKyB4XTtcbiAgfVxuXG4gIGdldFNxdWFyZSh4LCB5LCB3LCBoKSB7XG4gICAgbGV0IHNxdWFyZSA9IG5ldyBBcnJheTJEKHcsIGgpXG4gICAgZm9yIChsZXQgaT0wOyBpPHc7IGkrKykge1xuICAgICAgZm9yIChsZXQgaj0wOyBqPGg7IGorKykge1xuICAgICAgICBzcXVhcmUuc2V0KGksIGosIHRoaXMuZ2V0KHggKyBpLCB5ICsgaikpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0KHgsIHksIG5ld1ZhbCkge1xuICAgIHRoaXMuY29udGVudFt5ICogdGhpcy53aWR0aCArIHhdID0gbmV3VmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZmlsbChjb250ZW50KSB7XG4gICAgdGhpcy5mb3JFYWNoKChfLCB4LCB5KSA9PiB7XG4gICAgICB0aGlzLnNldCh4LCB5LCBjb250ZW50KTtcbiAgICB9KVxuICB9XG5cbiAgZm9yRWFjaChjYWxsYmFjaykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7IHkrKykge1xuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgY2FsbGJhY2sodGhpcy5jb250ZW50W3kgKiB0aGlzLndpZHRoICsgeF0sIHgsIHkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb3Qge1xuXHRwcmVsb2FkKCkge1xuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdGNvbnNvbGUubG9nKCdib290Jyk7XG5cdFx0dGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyk7XG5cdH1cblxufSIsImxldCBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDE0MDAsIDgwMCwgUGhhc2VyLkFVVE8pO1xuXG5pbXBvcnQgQm9vdCBmcm9tICcuL0Jvb3QnO1xuaW1wb3J0IFByZWxvYWQgZnJvbSAnLi9QcmVsb2FkJztcbmltcG9ydCBJbnRybyBmcm9tICcuL0ludHJvJztcbmltcG9ydCBSdW4gZnJvbSAnLi9SdW4nO1xuXG5nYW1lLnN0YXRlLmFkZCgnYm9vdCcsIEJvb3QpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3ByZWxvYWQnLCBQcmVsb2FkKTtcbmdhbWUuc3RhdGUuYWRkKCdpbnRybycsIEludHJvKTtcbmdhbWUuc3RhdGUuYWRkKCdydW4nLCBSdW4pO1xuZ2FtZS5zdGF0ZS5zdGFydCgnYm9vdCcpOyIsImltcG9ydCBBcnJheTJEIGZyb20gJy4vQXJyYXkyRCc7XG5cbmNvbnN0IE5FSUdIQk9SUyA9IFtcblx0Wy0xLCAtMV0sXG5cdFstMSwgMF0sXG5cdFstMSwgMV0sXG5cdFswLCAtMV0sXG5cdFswLCAxXSxcblx0WzEsIC0xXSxcblx0WzEsIDBdLFxuXHRbMSwgMV1cbl07XG5cbmNvbnN0IFBFTlRPTUlOTyA9IFtcblx0Wy0xLCAwXSxcblx0WzAsIDBdLFxuXHRbMCwgMV0sXG5cdFswLCAtMV0sXG5cdFsxLCAtMV1cbl07XG5cbmNvbnN0IEFDT1JOID0gW1xuXHRbMCwgMF0sXG5cdFsxLCAwXSxcblx0WzEsIC0yXSxcblx0WzMsIC0xXSxcblx0WzQsIDBdLFxuXHRbNSwgMF0sXG5cdFs2LCAwXVxuXTtcblxuY29uc3QgTElWRSA9ICdMSVZFJztcbmNvbnN0IERFQUQgPSAnREVBRCc7XG5cbmxldCBtYWtlQ2VsbCA9ICh4LCB5LCBzdGF0ZSwgbmVpZ2hib3JzPW51bGwpID0+IHtcblx0cmV0dXJuIHt4LCB5LCBzdGF0ZSwgbmVpZ2hib3JzfTtcbn1cblxuT2JqZWN0LnZhbHVlcyA9IChvYmopID0+IHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKChrZXkpID0+IHsgcmV0dXJuIG9ialtrZXldIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lT2ZMaWZlIHtcblx0Y29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgY2VsbHMgPSB7fSwgZGlmZiA9IG51bGwpIHtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy5jZWxscyA9IGNlbGxzO1xuXHRcdHRoaXMuZGlmZiA9IGRpZmY7XG5cdH0gXG5cblx0Z2V0RGlmZigpIHtcblx0XHRyZXR1cm4gdGhpcy5kaWZmIHx8IE9iamVjdC52YWx1ZXModGhpcy5jZWxscyk7XG5cdH1cblxuXHR4eXRvaSh4LCB5KSB7XG5cdFx0cmV0dXJuIHkgKiB0aGlzLndpZHRoICsgeDtcblx0fVxuXG5cdHRpY2soKSB7XG5cdFx0bGV0IGNlbGxzID0gdGhpcy5jZWxscztcblx0XHRsZXQgZGlmZiA9IFtdO1xuXHRcdGxldCB3b3JraW5nU2V0ID0ge307XG5cdFx0bGV0IG5ld0NlbGxzID0ge307XG5cblx0XHRsZXQgdG91Y2hDZWxsID0gKHgsIHkpID0+IHtcblx0XHRcdGlmICh4ID4gMCAmJiB4IDwgdGhpcy53aWR0aCAmJiB5ID4gMCAmJiB5IDwgdGhpcy5oZWlnaHQpIHtcblx0XHRcdFx0bGV0IGlkeCA9IHRoaXMueHl0b2koeCwgeSlcblx0XHRcdFx0aWYgKCF3b3JraW5nU2V0W2lkeF0pIHtcblx0XHRcdFx0XHR3b3JraW5nU2V0W2lkeF0gPSBtYWtlQ2VsbCh4LCB5LCBjZWxsc1tpZHhdID8gTElWRSA6IERFQUQsIDApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHdvcmtpbmdTZXRbaWR4XS5uZWlnaGJvcnMgKz0gMTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRsZXQgdG91Y2hOZWlnaGJvcnMgPSAoY2VsbCkgPT4ge1xuXHRcdFx0TkVJR0hCT1JTLmZvckVhY2goKGRlbHRhKSA9PiB7XG5cdFx0XHRcdGxldCBbZHgsIGR5XSA9IGRlbHRhO1xuXHRcdFx0XHR0b3VjaENlbGwoY2VsbC54ICsgZHgsIGNlbGwueSArIGR5KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGxldCBwdXNoTGl2ZSA9ICh4LCB5KSA9PiB7XG5cdFx0XHRuZXdDZWxsc1t0aGlzLnh5dG9pKHgsIHkpXSA9IG1ha2VDZWxsKHgsIHksIExJVkUpO1xuXHRcdH1cblxuXHRcdGxldCBwdXNoQ2hhbmdlID0gKHgsIHksIHN0YXRlKSA9PiB7XG5cdFx0XHRkaWZmLnB1c2gobWFrZUNlbGwoeCwgeSwgc3RhdGUpKTtcblx0XHR9XG5cblx0XHQvLyBjcmVhdGUgdGhlIHNldCBvZiBhbGwgY2VsbHMgd2l0aCAxIG9yIG1vcmUgbmVpZ2hib3JzXG5cblx0XHRPYmplY3QudmFsdWVzKGNlbGxzKS5mb3JFYWNoKChjZWxsKSA9PiB7XG5cdFx0XHR0b3VjaE5laWdoYm9ycyhjZWxsKTtcblx0XHR9KVxuXG5cdFx0Ly8gY2FsY3VsYXRlIHRoZSBuZXcgc2V0IG9mIGxpdmUgY2VsbHMgYW5kIHRoZSBjb2xsZWN0aW9uIG9mIGNlbGxzIHRoYXQgaGF2ZSBjaGFuZ2VkXG5cblx0XHRPYmplY3QudmFsdWVzKHdvcmtpbmdTZXQpLmZvckVhY2goKGNlbGwpID0+IHtcblx0XHRcdGlmIChjZWxsLnN0YXRlID09IERFQUQgJiYgY2VsbC5uZWlnaGJvcnMgPT0gMykge1xuXHRcdFx0XHRwdXNoQ2hhbmdlKGNlbGwueCwgY2VsbC55LCBHYW1lT2ZMaWZlLkxJVkUpO1xuXHRcdFx0XHRwdXNoTGl2ZShjZWxsLngsIGNlbGwueSk7XG5cdFx0XHR9XG5cblx0XHRcdGVsc2UgaWYgKGNlbGwuc3RhdGUgPT0gTElWRSkge1xuXHRcdFx0XHRpZiAoY2VsbC5uZWlnaGJvcnMgPCAyIHx8IGNlbGwubmVpZ2hib3JzID4gMykge1xuXHRcdFx0XHRcdHB1c2hDaGFuZ2UoY2VsbC54LCBjZWxsLnksIEdhbWVPZkxpZmUuREVBRCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRwdXNoTGl2ZShjZWxsLngsIGNlbGwueSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KVxuXG5cdFx0cmV0dXJuIG5ldyBHYW1lT2ZMaWZlKFxuXHRcdFx0dGhpcy53aWR0aCxcblx0XHRcdHRoaXMuaGVpZ2h0LFxuXHRcdFx0bmV3Q2VsbHMsXG5cdFx0XHRkaWZmXG5cdFx0KTtcblxuXHR9XG5cblx0YWRkU2hhcGUoeCwgeSwgZGVsdGFzKSB7XG5cdFx0ZGVsdGFzLmZvckVhY2goKHBhaXIpID0+IHtcblx0XHRcdGxldCBbZHgsIGR5XSA9IHBhaXI7XG5cdFx0XHRsZXQgbnggPSB4ICsgZHg7XG5cdFx0XHRsZXQgbnkgPSB5ICsgZHk7XG5cdFx0XHRsZXQgaWR4ID0gdGhpcy54eXRvaShueCwgbnkpO1xuXHRcdFx0dGhpcy5jZWxsc1tpZHhdID0gbWFrZUNlbGwobngsIG55LCBMSVZFKTtcblx0XHR9KTtcblx0fSBcblxuXHRhZGRQZW50b21pbm8oeCwgeSkge1xuXHRcdHRoaXMuYWRkU2hhcGUoeCwgeSwgUEVOVE9NSU5PKTtcblx0fVxuXG5cdGFkZEFjb3JuKHgsIHkpIHtcblx0XHR0aGlzLmFkZFNoYXBlKHgsIHksIEFDT1JOKTtcblx0fVxufVxuXG5HYW1lT2ZMaWZlLkRFQUQgPSBMSVZFO1xuR2FtZU9mTGlmZS5MSVZFID0gREVBRDtcblxud2luZG93LkdPTCA9IEdhbWVPZkxpZmU7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50cm8ge1xuXHRwcmVsb2FkKCkge1xuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdGNvbnNvbGUubG9nKCdpbnRybycpO1xuICAgIGxldCBmb250U2l6ZSA9IDMyO1xuXHRcdGxldCBzdHlsZSA9IHsgZm9udDogZm9udFNpemUgKyBcInB4IG1vbm9zcGFjZVwiLCBmaWxsOiBcIiNmZmZcIn07XG4gICAgbGV0IHRleHQgPSAnQXV0b21hdGEnO1xuICAgIGxldCB0ZXh0U2l6ZSA9IHRleHQubGVuZ3RoICogZm9udFNpemU7XG5cdFx0dGhpcy5nYW1lLmFkZC50ZXh0KHRoaXMuZ2FtZS53aWR0aC8yIC0gdGV4dFNpemUvMywgdGhpcy5nYW1lLmhlaWdodC8yIC0gZm9udFNpemUgKiA0LCAnQXV0b21hdGEnLCBzdHlsZSk7XG5cdFx0dGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdydW4nKTtcblx0fVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlbG9hZCB7XG5cdHByZWxvYWQoKSB7XG5cblx0fVxuXG5cdGNyZWF0ZSgpIHtcblx0XHRjb25zb2xlLmxvZygncHJlbG9hZCcpO1xuXHRcdHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnaW50cm8nKTtcblx0fVxufSIsImltcG9ydCBHYW1lT2ZMaWZlIGZyb20gJy4vR2FtZU9mTGlmZSc7XG5pbXBvcnQgQXJyYXkyRCBmcm9tICcuL0FycmF5MkQnO1xuXG5jb25zdCBmb250U2l6ZSA9IDg7XG5jb25zdCBzdHlsZSA9IHtmb250OiBmb250U2l6ZSArIFwicHggbW9ub3NwYWNlXCIsIGZpbGw6IFwiI2ZmZlwifVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdW4ge1xuXHRwcmVsb2FkKCkge1xuXG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0bGV0IHNpbVdpZHRoID0gdGhpcy5nYW1lLndpZHRoIC8gZm9udFNpemU7XG5cdFx0bGV0IHNpbUhlaWdodCA9IHRoaXMuZ2FtZS5oZWlnaHQgLyBmb250U2l6ZTtcblxuXHRcdHRoaXMuc2ltdWxhdGlvbiA9IG5ldyBHYW1lT2ZMaWZlKHNpbVdpZHRoLCBzaW1IZWlnaHQpO1xuXG5cdFx0bGV0IGN4ID0gTWF0aC5mbG9vcih0aGlzLnNpbXVsYXRpb24ud2lkdGgvMik7XG5cdFx0bGV0IGN5ID0gTWF0aC5mbG9vcih0aGlzLnNpbXVsYXRpb24uaGVpZ2h0LzIpO1xuXG5cdFx0Ly90aGlzLnNpbXVsYXRpb24uYWRkUGVudG9taW5vKGN4LCBjeSk7XG5cdFx0XG5cdFx0dGhpcy5zaW11bGF0aW9uLmFkZEFjb3JuKGN4LCBjeSk7XG5cblx0XHR0aGlzLnNjcmVlbiA9IG5ldyBBcnJheTJEKHNpbVdpZHRoLCBzaW1IZWlnaHQpO1xuXHRcdGZvciAobGV0IHggPSAwOyB4PHNpbVdpZHRoOyB4KyspIHtcblx0XHRcdGZvciAobGV0IHkgPSAwOyB5PHNpbUhlaWdodDsgeSsrKSB7XG5cdFx0XHRcdHRoaXMuc2NyZWVuLnNldCh4LCB5LCB0aGlzLmdhbWUuYWRkLnRleHQoeCAqIGZvbnRTaXplLCB5ICogZm9udFNpemUsICcgJywgc3R5bGUpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLmRyYXcoKTtcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblx0XHR0aGlzLnNpbXVsYXRpb24gPSB0aGlzLnNpbXVsYXRpb24udGljaygpO1xuXHRcdHRoaXMuZHJhdygpO1xuXHR9XG5cblx0ZHJhdygpIHtcblx0XHR0aGlzLnNpbXVsYXRpb24uZ2V0RGlmZigpLmZvckVhY2goKGNlbGwpID0+IHtcblx0XHRcdGlmIChjZWxsLnN0YXRlID09PSBHYW1lT2ZMaWZlLkxJVkUpIHtcblx0XHRcdFx0dGhpcy5zY3JlZW4uZ2V0KGNlbGwueCwgY2VsbC55KS5zZXRUZXh0KCcqJyk7XG5cdFx0XHR9IGVsc2UgaWYgKGNlbGwuc3RhdGUgPT09IEdhbWVPZkxpZmUuREVBRCkge1xuXHRcdFx0XHR0aGlzLnNjcmVlbi5nZXQoY2VsbC54LCBjZWxsLnkpLnNldFRleHQoJyAnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdJTlZBTElEIENFTEw6ICcsIGNlbGwpO1xuXHRcdFx0XHR0aHJvdyBFcnJvcignaW52YWxpZCBjZWxsJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0XG5cdH1cbn0iXX0=
