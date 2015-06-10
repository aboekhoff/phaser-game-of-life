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

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var PENTOMINO = [[-1, 0], [0, 0], [0, 1], [0, -1], [1, -1]];

var ACORN = [[0, 0], [1, 0], [1, -2], [3, -1], [4, 0], [5, 0], [6, 0]];

var Cell = (function () {
	function Cell(x, y) {
		_classCallCheck(this, Cell);

		this.x = x;
		this.y = y;
		this.index = this.x + ',' + this.y;
	}

	_createClass(Cell, [{
		key: 'toString',
		value: function toString() {
			return this.index;
		}
	}]);

	return Cell;
})();

var FasterGameOfLife = (function () {
	function FasterGameOfLife() {
		_classCallCheck(this, FasterGameOfLife);

		this.diff = null;
		this.cells = [];
		this.cellIndex = {};
	}

	_createClass(FasterGameOfLife, [{
		key: 'getDiff',
		value: function getDiff() {
			return this.diff || { live: this.cells, dead: [] };
		}
	}, {
		key: 'neighborhoodOf',
		value: function neighborhoodOf(cell) {
			var neighborhood = [];
			for (var dx = -1; dx <= 1; dx++) {
				for (var dy = -1; dy <= 1; dy++) {
					neighborhood.push(new Cell(cell.x + dx, cell.y + dy));
				}
			}
			return neighborhood;
		}
	}, {
		key: 'lookupIndexOf',
		value: function lookupIndexOf(cell) {
			var index = 0;
			var neighborhood = this.neighborhoodOf(cell);
			for (var i = 0; i < 9; i++) {
				if (this.cellIndex[neighborhood[i]]) {
					index |= 1 << i;
				}
			}
			return index;
		}
	}, {
		key: 'isAlive',
		value: function isAlive(cell) {
			return this.cellIndex[cell];
		}
	}, {
		key: 'willLive',
		value: function willLive(cell) {
			return TABLE[this.lookupIndexOf(cell)];
		}
	}, {
		key: 'getWorkingSet',
		value: function getWorkingSet() {
			var _this = this;

			var seen = {};
			var workingSet = [];
			this.cells.forEach(function (cell) {
				_this.neighborhoodOf(cell).forEach(function (cell) {
					if (cell && !seen[cell]) {
						seen[cell] = true;
						workingSet.push(cell);
					}
				});
			});
			return workingSet;
		}
	}, {
		key: 'tick',
		value: function tick() {
			var _this2 = this;

			var newCells = [];
			var newCellIndex = {};
			var diff = {
				live: [],
				dead: []
			};

			this.getWorkingSet().forEach(function (cell) {
				var isLive = _this2.isAlive(cell);
				var willLive = _this2.willLive(cell);
				if (willLive) {
					newCells.push(cell);
					newCellIndex[cell] = true;
					if (!isLive) {
						diff.live.push(cell);
					}
				} else if (isLive) {
					diff.dead.push(cell);
				}
			});

			this.cells = newCells;
			this.cellIndex = newCellIndex;
			this.diff = diff;
		}
	}, {
		key: 'addShape',
		value: function addShape(x, y, deltas) {
			var _this3 = this;

			deltas.forEach(function (delta) {
				var _delta = _slicedToArray(delta, 2);

				var dx = _delta[0];
				var dy = _delta[1];

				var cell = new Cell(x + dx, y + dy);
				_this3.cells.push(cell);
				_this3.cellIndex[cell] = true;
			});
			return this;
		}
	}, {
		key: 'addAcorn',
		value: function addAcorn(x, y) {
			return this.addShape(x, y, ACORN);
		}
	}, {
		key: 'addPentomino',
		value: function addPentomino(x, y) {
			return this.addShape(x, y, PENTOMINO);
		}
	}]);

	return FasterGameOfLife;
})();

exports['default'] = FasterGameOfLife;

var TABLE = (function () {
	var size = 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1;
	var table = Array(size);

	var evaluate = function evaluate(n) {
		var neighbors = 0;
		var cell = 0;

		for (var i = 0; i < 4; i++) {
			if (n & 1) {
				neighbors++;
			}
			n = n >> 1;
		}

		cell = n & 1;
		n = n >> 1;

		for (var i = 0; i < 4; i++) {
			if (n & 1) {
				neighbors++;
			}
			n = n >> 1;
		}

		if (cell === 0 && neighbors === 3 || cell === 1 && (neighbors === 2 || neighbors === 3)) {
			return 1;
		} else {
			return 0;
		}
	};

	for (var i = 0; i < size; i++) {
		table[i] = evaluate(i);
	}

	return table;
})();
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
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

var game = new Phaser.Game(1000, 800, Phaser.AUTO);

game.state.add('boot', _Boot2['default']);
game.state.add('preload', _Preload2['default']);
game.state.add('intro', _Intro2['default']);
game.state.add('run', _Run2['default']);
game.state.start('boot');

},{"./Boot":2,"./Intro":5,"./Preload":6,"./Run":7}],5:[function(require,module,exports){
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
			this.game.add.text(this.game.width / 2 - textSize / 3, this.game.height / 3 - fontSize * 4, "Automata", style);
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

var _FasterGameOfLife = require('./FasterGameOfLife');

var _FasterGameOfLife2 = _interopRequireDefault(_FasterGameOfLife);

var _Array2D = require('./Array2D');

var _Array2D2 = _interopRequireDefault(_Array2D);

var textureSize = 2;

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
			this.screenWidth = Math.floor(this.game.width / textureSize);
			this.screenHeight = Math.floor(this.game.height / textureSize);

			window.simulation = this.simulation = new _FasterGameOfLife2['default']();

			var cx = Math.floor(this.screenWidth / 2);
			var cy = Math.floor(this.screenHeight / 2);

			this.simulation.addAcorn(cx, cy);

			this.liveTexture = this.game.add.bitmapData(textureSize, textureSize);
			this.liveTexture.fill(220, 20, 20, 1);

			this.deadTexture = this.game.add.bitmapData(textureSize, textureSize);
			this.deadTexture.fill(0, 0, 0, 1);

			this.millisPerTick = 140;
			this.millisSinceLastTick = 0;

			this.draw();
		}
	}, {
		key: 'update',
		value: function update() {
			this.millisSinceLastTick += this.game.time.elapsed;
			if (this.millisSinceLastTick >= this.millisPerTick) {
				this.millisSinceLastTick = 0;
				this.simulation.tick();
				this.draw();
			}
		}
	}, {
		key: 'draw',
		value: function draw() {
			var _this = this;

			var inBounds = function inBounds(cell) {
				return cell.x > 0 && cell.x < _this.screenWidth && cell.y > 0 && cell.y < _this.screenHeight;
			};

			var diff = this.simulation.getDiff();

			diff.live.forEach(function (cell) {
				if (inBounds(cell)) {
					_this.game.add.sprite(cell.x * textureSize, cell.y * textureSize, _this.liveTexture);
				}
			});

			diff.dead.forEach(function (cell) {
				if (inBounds(cell)) {
					_this.game.add.sprite(cell.x * textureSize, cell.y * textureSize, _this.deadTexture);
				}
			});
		}
	}]);

	return Run;
})();

exports['default'] = Run;
module.exports = exports['default'];

},{"./Array2D":1,"./FasterGameOfLife":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0FycmF5MkQuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0Jvb3QuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0Zhc3RlckdhbWVPZkxpZmUuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0dhbWUuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0ludHJvLmpzIiwiL1VzZXJzL2Fib2VraG9mZi9Qcm9qZWN0cy9waGFzZXItZ2FtZS1vZi1saWZlL3NyYy9QcmVsb2FkLmpzIiwiL1VzZXJzL2Fib2VraG9mZi9Qcm9qZWN0cy9waGFzZXItZ2FtZS1vZi1saWZlL3NyYy9SdW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0lDQXFCLE9BQU87QUFDZixXQURRLE9BQU8sQ0FDZCxLQUFLLEVBQUUsTUFBTSxFQUFFOzBCQURSLE9BQU87O0FBRXhCLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFFBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFFBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0dBQzFDOztlQUxrQixPQUFPOztXQU92QixhQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDUixhQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDekM7OztXQUVRLG1CQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNwQixVQUFJLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDOUIsV0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN0QixhQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3RCLGdCQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3pDO09BQ0Y7S0FDRjs7O1dBRUUsYUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRTtBQUNoQixVQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUMxQyxhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FFRyxjQUFDLE9BQU8sRUFBRTs7O0FBQ1osVUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFLO0FBQ3hCLGNBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7T0FDekIsQ0FBQyxDQUFBO0tBQ0g7OztXQUVNLGlCQUFDLFFBQVEsRUFBRTtBQUNoQixXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNwQyxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNuQyxrQkFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2xEO09BQ0Y7S0FDRjs7O1NBckNrQixPQUFPOzs7cUJBQVAsT0FBTzs7Ozs7Ozs7Ozs7Ozs7SUNBUCxJQUFJO1VBQUosSUFBSTt3QkFBSixJQUFJOzs7Y0FBSixJQUFJOztTQUNqQixtQkFBRyxFQUNUOzs7U0FFSyxrQkFBRztBQUNSLFVBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEIsT0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0dBQ2pDOzs7UUFQbUIsSUFBSTs7O3FCQUFKLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBekIsSUFBTSxTQUFTLEdBQUcsQ0FDakIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDUCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUNQLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQ1AsQ0FBQzs7QUFFRixJQUFNLEtBQUssR0FBRyxDQUNiLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ1AsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDUCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDTixDQUFDOztJQUVJLElBQUk7QUFDRSxVQUROLElBQUksQ0FDRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO3dCQURiLElBQUk7O0FBRVIsTUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDWCxNQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNYLE1BQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNuQzs7Y0FMSSxJQUFJOztTQU9ELG9CQUFHO0FBQ1YsVUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0dBQ2xCOzs7UUFUSSxJQUFJOzs7SUFZVyxnQkFBZ0I7QUFDekIsVUFEUyxnQkFBZ0IsR0FDdEI7d0JBRE0sZ0JBQWdCOztBQUVuQyxNQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixNQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNoQixNQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztFQUNwQjs7Y0FMbUIsZ0JBQWdCOztTQU83QixtQkFBRztBQUNULFVBQU8sSUFBSSxDQUFDLElBQUksSUFBSSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQTtHQUNoRDs7O1NBRWEsd0JBQUMsSUFBSSxFQUFFO0FBQ3BCLE9BQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN0QixRQUFLLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDOUIsU0FBSyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO0FBQy9CLGlCQUFZLENBQUMsSUFBSSxDQUNoQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUNsQyxDQUFDO0tBQ0Y7SUFDRDtBQUNELFVBQU8sWUFBWSxDQUFDO0dBQ3BCOzs7U0FFWSx1QkFBQyxJQUFJLEVBQUU7QUFDbkIsT0FBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQ2QsT0FBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QyxRQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3ZCLFFBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNwQyxVQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNoQjtJQUNEO0FBQ0QsVUFBTyxLQUFLLENBQUM7R0FDYjs7O1NBRU0saUJBQUMsSUFBSSxFQUFFO0FBQ2IsVUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQzVCOzs7U0FFTyxrQkFBQyxJQUFJLEVBQUU7QUFDZCxVQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7R0FDdkM7OztTQUVZLHlCQUFHOzs7QUFDZixPQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZCxPQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDcEIsT0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDNUIsVUFBSyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQzNDLFNBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3hCLFVBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDbEIsZ0JBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDdEI7S0FDRCxDQUFDLENBQUM7SUFDSCxDQUFDLENBQUM7QUFDSCxVQUFPLFVBQVUsQ0FBQztHQUNsQjs7O1NBRUcsZ0JBQUc7OztBQUNOLE9BQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixPQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDdEIsT0FBSSxJQUFJLEdBQUc7QUFDVixRQUFJLEVBQUUsRUFBRTtBQUNSLFFBQUksRUFBRSxFQUFFO0lBQ1IsQ0FBQTs7QUFFRCxPQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ3RDLFFBQUksTUFBTSxHQUFHLE9BQUssT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hDLFFBQUksUUFBUSxHQUFHLE9BQUssUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLFFBQUksUUFBUSxFQUFFO0FBQ2IsYUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixpQkFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztBQUMxQixTQUFJLENBQUMsTUFBTSxFQUFFO0FBQ1osVUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7TUFDcEI7S0FDRCxNQUFNLElBQUksTUFBTSxFQUFFO0FBQ2xCLFNBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQ3BCO0lBQ0QsQ0FBQyxDQUFBOztBQUVGLE9BQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO0FBQ3RCLE9BQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO0FBQzlCLE9BQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0dBRWpCOzs7U0FFTyxrQkFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRTs7O0FBQ3RCLFNBQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUs7Z0NBQ1YsS0FBSzs7UUFBZixFQUFFO1FBQUUsRUFBRTs7QUFDWCxRQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNwQyxXQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsV0FBSyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUMsQ0FBQTtBQUNGLFVBQU8sSUFBSSxDQUFDO0dBQ1o7OztTQUVPLGtCQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDZCxVQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztHQUNsQzs7O1NBRVcsc0JBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNsQixVQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztHQUN0Qzs7O1FBcEdtQixnQkFBZ0I7OztxQkFBaEIsZ0JBQWdCOztBQXdHckMsSUFBTSxLQUFLLEdBQUcsQ0FBQyxZQUFNO0FBQ3BCLEtBQUksSUFBSSxHQUFHLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO0FBQzdCLEtBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFeEIsS0FBSSxRQUFRLEdBQUcsU0FBWCxRQUFRLENBQUksQ0FBQyxFQUFLO0FBQ3JCLE1BQUksU0FBUyxHQUFHLENBQUMsQ0FBQTtBQUNqQixNQUFJLElBQUksR0FBRyxDQUFDLENBQUE7O0FBRVosT0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN2QixPQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFBRSxhQUFTLEVBQUUsQ0FBQztJQUFFO0FBQzNCLElBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ1g7O0FBRUQsTUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDYixHQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFWCxPQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3ZCLE9BQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUFFLGFBQVMsRUFBRSxDQUFDO0lBQUU7QUFDM0IsSUFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDWDs7QUFFRCxNQUFJLEFBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxTQUFTLEtBQUssQ0FBQyxJQUNoQyxJQUFJLEtBQUssQ0FBQyxLQUFLLFNBQVMsS0FBSyxDQUFDLElBQUksU0FBUyxLQUFLLENBQUMsQ0FBQSxBQUFDLEFBQUMsRUFBRTtBQUN0RCxVQUFPLENBQUMsQ0FBQztHQUNULE1BRUk7QUFDSixVQUFPLENBQUMsQ0FBQztHQUNUO0VBRUQsQ0FBQTs7QUFFRCxNQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzFCLE9BQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdkI7O0FBRUQsUUFBTyxLQUFLLENBQUM7Q0FDYixDQUFBLEVBQUcsQ0FBQzs7Ozs7Ozs7b0JDektZLFFBQVE7Ozs7dUJBQ0wsV0FBVzs7OztxQkFDYixTQUFTOzs7O21CQUNYLE9BQU87Ozs7QUFMdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQU9uRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLG9CQUFPLENBQUM7QUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyx1QkFBVSxDQUFDO0FBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8scUJBQVEsQ0FBQztBQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLG1CQUFNLENBQUM7QUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7SUNYSixLQUFLO1VBQUwsS0FBSzt3QkFBTCxLQUFLOzs7Y0FBTCxLQUFLOztTQUNsQixtQkFBRyxFQUNUOzs7U0FFSyxrQkFBRztBQUNSLFVBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkIsT0FBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE9BQUksS0FBSyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRyxjQUFjLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO0FBQzNELE9BQUksSUFBSSxHQUFHLFVBQVUsQ0FBQztBQUN0QixPQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztBQUN4QyxPQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFHLFFBQVEsR0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFHLFFBQVEsR0FBRyxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3pHLE9BQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUM3Qjs7O1FBWm1CLEtBQUs7OztxQkFBTCxLQUFLOzs7Ozs7Ozs7Ozs7OztJQ0FMLE9BQU87VUFBUCxPQUFPO3dCQUFQLE9BQU87OztjQUFQLE9BQU87O1NBQ3BCLG1CQUFHLEVBRVQ7OztTQUVLLGtCQUFHO0FBQ1IsVUFBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN2QixPQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7R0FDL0I7OztRQVJtQixPQUFPOzs7cUJBQVAsT0FBTzs7Ozs7Ozs7Ozs7Ozs7OztnQ0NBQyxvQkFBb0I7Ozs7dUJBQzdCLFdBQVc7Ozs7QUFFL0IsSUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDOztJQUVELEdBQUc7VUFBSCxHQUFHO3dCQUFILEdBQUc7OztjQUFILEdBQUc7O1NBQ2hCLG1CQUFHLEVBRVQ7OztTQUVLLGtCQUFHO0FBQ1IsT0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxDQUFDO0FBQzdELE9BQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsQ0FBQzs7QUFFL0QsU0FBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLG1DQUFzQixDQUFDOztBQUU3RCxPQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEMsT0FBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQyxDQUFDOztBQUV6QyxPQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7O0FBRWpDLE9BQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN0RSxPQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFdEMsT0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3RFLE9BQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUVsQyxPQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztBQUN6QixPQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDOztBQUU3QixPQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7R0FDWjs7O1NBRUssa0JBQUc7QUFDUixPQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ25ELE9BQUksSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7QUFDbkQsUUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQztBQUM3QixRQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3ZCLFFBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNaO0dBQ0Q7OztTQUVHLGdCQUFHOzs7QUFDTixPQUFJLFFBQVEsR0FBRyxTQUFYLFFBQVEsQ0FBSSxJQUFJLEVBQUs7QUFDeEIsV0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFDYixJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQUssV0FBVyxJQUN6QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFDVixJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQUssWUFBWSxDQUFDO0lBQy9CLENBQUE7O0FBRUQsT0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFckMsT0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDM0IsUUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDbkIsV0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLFdBQVcsRUFBRSxNQUFLLFdBQVcsQ0FBQyxDQUFDO0tBQ25GO0lBQ0QsQ0FBQyxDQUFBOztBQUVGLE9BQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQzNCLFFBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ25CLFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxXQUFXLEVBQUUsTUFBSyxXQUFXLENBQUMsQ0FBQztLQUNuRjtJQUNELENBQUMsQ0FBQTtHQUVGOzs7UUEzRG1CLEdBQUc7OztxQkFBSCxHQUFHIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFycmF5MkQge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuY29udGVudCA9IG5ldyBBcnJheSh3aWR0aCAqIGhlaWdodCk7XG4gIH1cblxuICBnZXQoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnRbeSAqIHRoaXMud2lkdGggKyB4XTtcbiAgfVxuXG4gIGdldFNxdWFyZSh4LCB5LCB3LCBoKSB7XG4gICAgbGV0IHNxdWFyZSA9IG5ldyBBcnJheTJEKHcsIGgpXG4gICAgZm9yIChsZXQgaT0wOyBpPHc7IGkrKykge1xuICAgICAgZm9yIChsZXQgaj0wOyBqPGg7IGorKykge1xuICAgICAgICBzcXVhcmUuc2V0KGksIGosIHRoaXMuZ2V0KHggKyBpLCB5ICsgaikpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0KHgsIHksIG5ld1ZhbCkge1xuICAgIHRoaXMuY29udGVudFt5ICogdGhpcy53aWR0aCArIHhdID0gbmV3VmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZmlsbChjb250ZW50KSB7XG4gICAgdGhpcy5mb3JFYWNoKChfLCB4LCB5KSA9PiB7XG4gICAgICB0aGlzLnNldCh4LCB5LCBjb250ZW50KTtcbiAgICB9KVxuICB9XG5cbiAgZm9yRWFjaChjYWxsYmFjaykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7IHkrKykge1xuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgY2FsbGJhY2sodGhpcy5jb250ZW50W3kgKiB0aGlzLndpZHRoICsgeF0sIHgsIHkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb3Qge1xuXHRwcmVsb2FkKCkge1xuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdGNvbnNvbGUubG9nKCdib290Jyk7XG5cdFx0dGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyk7XG5cdH1cblxufSIsImNvbnN0IFBFTlRPTUlOTyA9IFtcblx0Wy0xLCAwXSxcblx0WzAsIDBdLFxuXHRbMCwgMV0sXG5cdFswLCAtMV0sXG5cdFsxLCAtMV1cbl07XG5cbmNvbnN0IEFDT1JOID0gW1xuXHRbMCwgMF0sXG5cdFsxLCAwXSxcblx0WzEsIC0yXSxcblx0WzMsIC0xXSxcblx0WzQsIDBdLFxuXHRbNSwgMF0sXG5cdFs2LCAwXVxuXTtcblxuY2xhc3MgQ2VsbCB7XG5cdGNvbnN0cnVjdG9yKHgsIHkpIHtcblx0XHR0aGlzLnggPSB4O1xuXHRcdHRoaXMueSA9IHk7XG5cdFx0dGhpcy5pbmRleCA9IHRoaXMueCArICcsJyArIHRoaXMueTtcblx0fVxuXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmluZGV4O1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZhc3RlckdhbWVPZkxpZmUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmRpZmYgPSBudWxsO1xuXHRcdHRoaXMuY2VsbHMgPSBbXTtcblx0XHR0aGlzLmNlbGxJbmRleCA9IHt9O1xuXHR9XG5cblx0Z2V0RGlmZigpIHtcblx0XHRyZXR1cm4gdGhpcy5kaWZmIHx8IHtsaXZlOiB0aGlzLmNlbGxzLCBkZWFkOiBbXX1cblx0fVxuXG5cdG5laWdoYm9yaG9vZE9mKGNlbGwpIHtcblx0XHRsZXQgbmVpZ2hib3Job29kID0gW107XG5cdFx0Zm9yIChsZXQgZHggPSAtMTsgZHg8PTE7IGR4KyspIHtcblx0XHRcdGZvciAobGV0IGR5ID0gLTE7IGR5IDw9MTsgZHkrKykge1xuXHRcdFx0XHRuZWlnaGJvcmhvb2QucHVzaChcblx0XHRcdFx0XHRuZXcgQ2VsbChjZWxsLnggKyBkeCwgY2VsbC55ICsgZHkpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBuZWlnaGJvcmhvb2Q7XG5cdH1cblxuXHRsb29rdXBJbmRleE9mKGNlbGwpIHtcblx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdGxldCBuZWlnaGJvcmhvb2QgPSB0aGlzLm5laWdoYm9yaG9vZE9mKGNlbGwpO1xuXHRcdGZvciAobGV0IGk9MDsgaTw5OyBpKyspIHtcblx0XHRcdGlmICh0aGlzLmNlbGxJbmRleFtuZWlnaGJvcmhvb2RbaV1dKSB7XG5cdFx0XHRcdGluZGV4IHw9IDEgPDwgaTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGluZGV4O1xuXHR9XG5cblx0aXNBbGl2ZShjZWxsKSB7XG5cdFx0cmV0dXJuIHRoaXMuY2VsbEluZGV4W2NlbGxdO1xuXHR9XG5cblx0d2lsbExpdmUoY2VsbCkge1xuXHRcdHJldHVybiBUQUJMRVt0aGlzLmxvb2t1cEluZGV4T2YoY2VsbCldO1xuXHR9XG5cblx0Z2V0V29ya2luZ1NldCgpIHtcblx0XHRsZXQgc2VlbiA9IHt9O1xuXHRcdGxldCB3b3JraW5nU2V0ID0gW107IFxuXHRcdHRoaXMuY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuXHRcdFx0dGhpcy5uZWlnaGJvcmhvb2RPZihjZWxsKS5mb3JFYWNoKChjZWxsKSA9PiB7XG5cdFx0XHRcdGlmIChjZWxsICYmICFzZWVuW2NlbGxdKSB7XG5cdFx0XHRcdFx0c2VlbltjZWxsXSA9IHRydWU7XG5cdFx0XHRcdFx0d29ya2luZ1NldC5wdXNoKGNlbGwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gd29ya2luZ1NldDtcblx0fVxuXG5cdHRpY2soKSB7XG5cdFx0bGV0IG5ld0NlbGxzID0gW107XG5cdFx0bGV0IG5ld0NlbGxJbmRleCA9IHt9O1xuXHRcdGxldCBkaWZmID0ge1xuXHRcdFx0bGl2ZTogW10sXG5cdFx0XHRkZWFkOiBbXVxuXHRcdH1cblxuXHRcdHRoaXMuZ2V0V29ya2luZ1NldCgpLmZvckVhY2goKGNlbGwpID0+IHtcblx0XHRcdGxldCBpc0xpdmUgPSB0aGlzLmlzQWxpdmUoY2VsbCk7XG5cdFx0XHRsZXQgd2lsbExpdmUgPSB0aGlzLndpbGxMaXZlKGNlbGwpO1xuXHRcdFx0aWYgKHdpbGxMaXZlKSB7XG5cdFx0XHRcdG5ld0NlbGxzLnB1c2goY2VsbCk7XG5cdFx0XHRcdG5ld0NlbGxJbmRleFtjZWxsXSA9IHRydWU7XG5cdFx0XHRcdGlmICghaXNMaXZlKSB7XG5cdFx0XHRcdFx0ZGlmZi5saXZlLnB1c2goY2VsbClcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChpc0xpdmUpIHtcblx0XHRcdFx0ZGlmZi5kZWFkLnB1c2goY2VsbClcblx0XHRcdH1cblx0XHR9KVxuXG5cdFx0dGhpcy5jZWxscyA9IG5ld0NlbGxzO1xuXHRcdHRoaXMuY2VsbEluZGV4ID0gbmV3Q2VsbEluZGV4O1xuXHRcdHRoaXMuZGlmZiA9IGRpZmY7XG5cblx0fVxuXG5cdGFkZFNoYXBlKHgsIHksIGRlbHRhcykge1xuXHRcdGRlbHRhcy5mb3JFYWNoKChkZWx0YSkgPT4ge1xuXHRcdFx0bGV0IFtkeCwgZHldID0gZGVsdGE7XG5cdFx0XHRsZXQgY2VsbCA9IG5ldyBDZWxsKHggKyBkeCwgeSArIGR5KTtcblx0XHRcdHRoaXMuY2VsbHMucHVzaChjZWxsKTtcblx0XHRcdHRoaXMuY2VsbEluZGV4W2NlbGxdID0gdHJ1ZTtcblx0XHR9KVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkQWNvcm4oeCwgeSkge1xuXHRcdHJldHVybiB0aGlzLmFkZFNoYXBlKHgsIHksIEFDT1JOKTtcblx0fVxuXG5cdGFkZFBlbnRvbWlubyh4LCB5KSB7XG5cdFx0cmV0dXJuIHRoaXMuYWRkU2hhcGUoeCwgeSwgUEVOVE9NSU5PKTtcblx0fVxuXG59XG5cbmNvbnN0IFRBQkxFID0gKCgpID0+IHtcblx0bGV0IHNpemUgPSA5KjgqNyo2KjUqNCozKjIqMTtcblx0bGV0IHRhYmxlID0gQXJyYXkoc2l6ZSk7XG5cblx0bGV0IGV2YWx1YXRlID0gKG4pID0+IHtcblx0XHRsZXQgbmVpZ2hib3JzID0gMFxuXHRcdGxldCBjZWxsID0gMFxuXHRcdFxuXHRcdGZvciAobGV0IGk9MDsgaTw0OyBpKyspIHtcblx0XHRcdGlmIChuICYgMSkgeyBuZWlnaGJvcnMrKzsgfVxuXHRcdFx0biA9IG4gPj4gMTtcblx0XHR9XG5cblx0XHRjZWxsID0gbiAmIDE7XG5cdFx0biA9IG4gPj4gMTtcblxuXHRcdGZvciAobGV0IGk9MDsgaTw0OyBpKyspIHtcblx0XHRcdGlmIChuICYgMSkgeyBuZWlnaGJvcnMrKzsgfVxuXHRcdFx0biA9IG4gPj4gMTtcblx0XHR9XG5cblx0XHRpZiAoKGNlbGwgPT09IDAgJiYgbmVpZ2hib3JzID09PSAzKSB8fFxuXHRcdFx0KGNlbGwgPT09IDEgJiYgKG5laWdoYm9ycyA9PT0gMiB8fCBuZWlnaGJvcnMgPT09IDMpKSkge1xuXHRcdFx0cmV0dXJuIDE7XG5cdFx0fVxuXG5cdFx0ZWxzZSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0fVxuXG5cdGZvciAobGV0IGk9MDsgaTxzaXplOyBpKyspIHtcblx0XHR0YWJsZVtpXSA9IGV2YWx1YXRlKGkpO1xuXHR9XG5cblx0cmV0dXJuIHRhYmxlO1xufSkoKTsiLCJsZXQgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSgxMDAwLCA4MDAsIFBoYXNlci5BVVRPKTtcblxuaW1wb3J0IEJvb3QgZnJvbSAnLi9Cb290JztcbmltcG9ydCBQcmVsb2FkIGZyb20gJy4vUHJlbG9hZCc7XG5pbXBvcnQgSW50cm8gZnJvbSAnLi9JbnRybyc7XG5pbXBvcnQgUnVuIGZyb20gJy4vUnVuJztcblxuZ2FtZS5zdGF0ZS5hZGQoJ2Jvb3QnLCBCb290KTtcbmdhbWUuc3RhdGUuYWRkKCdwcmVsb2FkJywgUHJlbG9hZCk7XG5nYW1lLnN0YXRlLmFkZCgnaW50cm8nLCBJbnRybyk7XG5nYW1lLnN0YXRlLmFkZCgncnVuJywgUnVuKTtcbmdhbWUuc3RhdGUuc3RhcnQoJ2Jvb3QnKTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRybyB7XG5cdHByZWxvYWQoKSB7XG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0Y29uc29sZS5sb2coJ2ludHJvJyk7XG4gICAgbGV0IGZvbnRTaXplID0gMzI7XG5cdFx0bGV0IHN0eWxlID0geyBmb250OiBmb250U2l6ZSArIFwicHggbW9ub3NwYWNlXCIsIGZpbGw6IFwiI2ZmZlwifTtcbiAgICBsZXQgdGV4dCA9ICdBdXRvbWF0YSc7XG4gICAgbGV0IHRleHRTaXplID0gdGV4dC5sZW5ndGggKiBmb250U2l6ZTtcblx0XHR0aGlzLmdhbWUuYWRkLnRleHQodGhpcy5nYW1lLndpZHRoLzIgLSB0ZXh0U2l6ZS8zLCB0aGlzLmdhbWUuaGVpZ2h0LzMgLSBmb250U2l6ZSAqIDQsICdBdXRvbWF0YScsIHN0eWxlKTtcblx0XHR0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ3J1bicpO1xuXHR9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkIHtcblx0cHJlbG9hZCgpIHtcblxuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdGNvbnNvbGUubG9nKCdwcmVsb2FkJyk7XG5cdFx0dGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdpbnRybycpO1xuXHR9XG59IiwiaW1wb3J0IEZhc3RlckdhbWVPZkxpZmUgZnJvbSAnLi9GYXN0ZXJHYW1lT2ZMaWZlJztcbmltcG9ydCBBcnJheTJEIGZyb20gJy4vQXJyYXkyRCc7XG5cbmNvbnN0IHRleHR1cmVTaXplID0gMjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVuIHtcblx0cHJlbG9hZCgpIHtcblxuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMuc2NyZWVuV2lkdGggPSBNYXRoLmZsb29yKHRoaXMuZ2FtZS53aWR0aCAvIHRleHR1cmVTaXplKTtcblx0XHR0aGlzLnNjcmVlbkhlaWdodCA9IE1hdGguZmxvb3IodGhpcy5nYW1lLmhlaWdodCAvIHRleHR1cmVTaXplKTtcblxuXHRcdHdpbmRvdy5zaW11bGF0aW9uID0gdGhpcy5zaW11bGF0aW9uID0gbmV3IEZhc3RlckdhbWVPZkxpZmUoKTtcblxuXHRcdGxldCBjeCA9IE1hdGguZmxvb3IodGhpcy5zY3JlZW5XaWR0aC8yKTtcblx0XHRsZXQgY3kgPSBNYXRoLmZsb29yKHRoaXMuc2NyZWVuSGVpZ2h0LzIpO1xuXHRcdFxuXHRcdHRoaXMuc2ltdWxhdGlvbi5hZGRBY29ybihjeCwgY3kpO1xuXG5cdFx0dGhpcy5saXZlVGV4dHVyZSA9IHRoaXMuZ2FtZS5hZGQuYml0bWFwRGF0YSh0ZXh0dXJlU2l6ZSwgdGV4dHVyZVNpemUpO1xuXHRcdHRoaXMubGl2ZVRleHR1cmUuZmlsbCgyMjAsIDIwLCAyMCwgMSk7XG5cblx0XHR0aGlzLmRlYWRUZXh0dXJlID0gdGhpcy5nYW1lLmFkZC5iaXRtYXBEYXRhKHRleHR1cmVTaXplLCB0ZXh0dXJlU2l6ZSk7XG5cdFx0dGhpcy5kZWFkVGV4dHVyZS5maWxsKDAsIDAsIDAsIDEpO1xuXHRcdFxuXHRcdHRoaXMubWlsbGlzUGVyVGljayA9IDE0MDtcblx0XHR0aGlzLm1pbGxpc1NpbmNlTGFzdFRpY2sgPSAwO1xuXG5cdFx0dGhpcy5kcmF3KCk7XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cdFx0dGhpcy5taWxsaXNTaW5jZUxhc3RUaWNrICs9IHRoaXMuZ2FtZS50aW1lLmVsYXBzZWQ7XG5cdFx0aWYgKHRoaXMubWlsbGlzU2luY2VMYXN0VGljayA+PSB0aGlzLm1pbGxpc1BlclRpY2spIHtcblx0XHRcdHRoaXMubWlsbGlzU2luY2VMYXN0VGljayA9IDA7XG5cdFx0XHR0aGlzLnNpbXVsYXRpb24udGljaygpO1xuXHRcdFx0dGhpcy5kcmF3KCk7XG5cdFx0fVxuXHR9XG5cblx0ZHJhdygpIHtcblx0XHRsZXQgaW5Cb3VuZHMgPSAoY2VsbCkgPT4ge1xuXHRcdFx0cmV0dXJuIGNlbGwueCA+IDAgJiYgXG5cdFx0XHRcdCAgIGNlbGwueCA8IHRoaXMuc2NyZWVuV2lkdGggJiZcblx0XHRcdFx0ICAgY2VsbC55ID4gMCAmJiBcblx0XHRcdFx0ICAgY2VsbC55IDwgdGhpcy5zY3JlZW5IZWlnaHQ7XG5cdFx0fVxuXG5cdFx0bGV0IGRpZmYgPSB0aGlzLnNpbXVsYXRpb24uZ2V0RGlmZigpO1xuXG5cdFx0ZGlmZi5saXZlLmZvckVhY2goKGNlbGwpID0+IHtcblx0XHRcdGlmIChpbkJvdW5kcyhjZWxsKSkge1xuXHRcdFx0XHR0aGlzLmdhbWUuYWRkLnNwcml0ZShjZWxsLnggKiB0ZXh0dXJlU2l6ZSwgY2VsbC55ICogdGV4dHVyZVNpemUsIHRoaXMubGl2ZVRleHR1cmUpO1xuXHRcdFx0fSBcblx0XHR9KVxuXG5cdFx0ZGlmZi5kZWFkLmZvckVhY2goKGNlbGwpID0+IHtcblx0XHRcdGlmIChpbkJvdW5kcyhjZWxsKSkge1xuXHRcdFx0XHR0aGlzLmdhbWUuYWRkLnNwcml0ZShjZWxsLnggKiB0ZXh0dXJlU2l6ZSwgY2VsbC55ICogdGV4dHVyZVNpemUsIHRoaXMuZGVhZFRleHR1cmUpO1xuXHRcdFx0fVxuXHRcdH0pXG5cblx0fVxufSJdfQ==
