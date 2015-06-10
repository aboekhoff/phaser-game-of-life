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

		this.cellIndex = {};
		this.diff = { live: [], dead: [] };
	}

	_createClass(FasterGameOfLife, [{
		key: 'getDiff',
		value: function getDiff() {
			return this.diff;
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
		key: 'isLive',
		value: function isLive(cell) {
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
			this.diff.live.forEach(function (cell) {
				_this.neighborhoodOf(cell).forEach(function (cell) {
					if (cell && !seen[cell]) {
						seen[cell] = true;
						workingSet.push(cell);
					}
				});
			});

			this.diff.dead.forEach(function (cell) {
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

			var newCellIndex = {};
			var newDiff = {
				live: [],
				dead: []
			};

			var workingSet = this.getWorkingSet();

			workingSet.forEach(function (cell) {
				var isLive = _this2.isLive(cell);
				var willLive = _this2.willLive(cell);
				if (willLive) {
					newCellIndex[cell] = true;
					if (!isLive) {
						newDiff.live.push(cell);
					}
				} else if (isLive) {
					newDiff.dead.push(cell);
				}
			});

			this.cellIndex = newCellIndex;
			this.diff = newDiff;
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
				_this3.diff.live.push(cell);
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

var game = new Phaser.Game(800, 600, Phaser.AUTO);

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

var fontSize = 4;
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
			this.screenWidth = Math.floor(this.game.width / fontSize);
			this.screenHeight = Math.floor(this.game.height / fontSize);

			window.simulation = this.simulation = new _FasterGameOfLife2['default']();

			var cx = Math.floor(this.screenWidth / 2);
			var cy = Math.floor(this.screenHeight / 2);

			this.simulation.addAcorn(cx, cy);

			this.screen = new _Array2D2['default'](this.screenWidth, this.screenHeight);
			for (var x = 0; x < this.screenWidth; x++) {
				for (var y = 0; y < this.screenHeight; y++) {
					this.screen.set(x, y, this.game.add.text(x * fontSize, y * fontSize, ' ', style));
				}
			}

			this.draw();

			this.millisPerTick = 140;
			this.elapsedTime = 0;
		}
	}, {
		key: 'update',
		value: function update() {
			this.elapsedTime += this.game.time.elapsed;
			if (this.elapsedTime >= this.millisPerTick) {
				this.simulation.tick();
				this.elapsedTime = 0;
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
					_this.screen.get(cell.x, cell.y).setText('*');
				}
			});

			diff.dead.forEach(function (cell) {
				if (inBounds(cell)) {
					_this.screen.get(cell.x, cell.y).setText(' ');
				}
			});
		}
	}]);

	return Run;
})();

exports['default'] = Run;
module.exports = exports['default'];

},{"./Array2D":1,"./FasterGameOfLife":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0FycmF5MkQuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0Jvb3QuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0Zhc3RlckdhbWVPZkxpZmUuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0dhbWUuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0ludHJvLmpzIiwiL1VzZXJzL2Fib2VraG9mZi9Qcm9qZWN0cy9waGFzZXItZ2FtZS1vZi1saWZlL3NyYy9QcmVsb2FkLmpzIiwiL1VzZXJzL2Fib2VraG9mZi9Qcm9qZWN0cy9waGFzZXItZ2FtZS1vZi1saWZlL3NyYy9SdW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0lDQXFCLE9BQU87QUFDZixXQURRLE9BQU8sQ0FDZCxLQUFLLEVBQUUsTUFBTSxFQUFFOzBCQURSLE9BQU87O0FBRXhCLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFFBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFFBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0dBQzFDOztlQUxrQixPQUFPOztXQU92QixhQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDUixhQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDekM7OztXQUVRLG1CQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNwQixVQUFJLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDOUIsV0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN0QixhQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3RCLGdCQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3pDO09BQ0Y7S0FDRjs7O1dBRUUsYUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRTtBQUNoQixVQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUMxQyxhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FFRyxjQUFDLE9BQU8sRUFBRTs7O0FBQ1osVUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFLO0FBQ3hCLGNBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7T0FDekIsQ0FBQyxDQUFBO0tBQ0g7OztXQUVNLGlCQUFDLFFBQVEsRUFBRTtBQUNoQixXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNwQyxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNuQyxrQkFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2xEO09BQ0Y7S0FDRjs7O1NBckNrQixPQUFPOzs7cUJBQVAsT0FBTzs7Ozs7Ozs7Ozs7Ozs7SUNBUCxJQUFJO1VBQUosSUFBSTt3QkFBSixJQUFJOzs7Y0FBSixJQUFJOztTQUNqQixtQkFBRyxFQUNUOzs7U0FFSyxrQkFBRztBQUNSLFVBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEIsT0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0dBQ2pDOzs7UUFQbUIsSUFBSTs7O3FCQUFKLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBekIsSUFBTSxTQUFTLEdBQUcsQ0FDakIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDUCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUNQLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQ1AsQ0FBQzs7QUFFRixJQUFNLEtBQUssR0FBRyxDQUNiLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ1AsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDUCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDTixDQUFDOztJQUVJLElBQUk7QUFDRSxVQUROLElBQUksQ0FDRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO3dCQURiLElBQUk7O0FBRVIsTUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDWCxNQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNYLE1BQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNuQzs7Y0FMSSxJQUFJOztTQU9ELG9CQUFHO0FBQ1YsVUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0dBQ2xCOzs7UUFUSSxJQUFJOzs7SUFZVyxnQkFBZ0I7QUFDekIsVUFEUyxnQkFBZ0IsR0FDdEI7d0JBRE0sZ0JBQWdCOztBQUVuQyxNQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFJLENBQUMsSUFBSSxHQUFHLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUE7RUFDaEM7O2NBSm1CLGdCQUFnQjs7U0FNN0IsbUJBQUc7QUFDVCxVQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7R0FDakI7OztTQUVhLHdCQUFDLElBQUksRUFBRTtBQUNwQixPQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDdEIsUUFBSyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO0FBQzlCLFNBQUssSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtBQUMvQixpQkFBWSxDQUFDLElBQUksQ0FDaEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FDbEMsQ0FBQztLQUNGO0lBQ0Q7QUFDRCxVQUFPLFlBQVksQ0FBQztHQUNwQjs7O1NBRVksdUJBQUMsSUFBSSxFQUFFO0FBQ25CLE9BQUksS0FBSyxHQUFHLENBQUMsQ0FBQztBQUNkLE9BQUksWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0MsUUFBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN2QixRQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDcEMsVUFBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDaEI7SUFDRDtBQUNELFVBQU8sS0FBSyxDQUFDO0dBQ2I7OztTQUVLLGdCQUFDLElBQUksRUFBRTtBQUNaLFVBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUM1Qjs7O1NBRU8sa0JBQUMsSUFBSSxFQUFFO0FBQ2QsVUFBTyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0dBQ3ZDOzs7U0FFWSx5QkFBRzs7O0FBQ2YsT0FBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsT0FBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE9BQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBSztBQUNoQyxVQUFLLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDM0MsU0FBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDeEIsVUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNsQixnQkFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUN0QjtLQUNELENBQUMsQ0FBQztJQUNILENBQUMsQ0FBQzs7QUFFSCxPQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDaEMsVUFBSyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQzNDLFNBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3hCLFVBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDbEIsZ0JBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDdEI7S0FDRCxDQUFDLENBQUM7SUFDSCxDQUFDLENBQUM7QUFDSCxVQUFPLFVBQVUsQ0FBQztHQUNsQjs7O1NBRUcsZ0JBQUc7OztBQUNOLE9BQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN0QixPQUFJLE9BQU8sR0FBRztBQUNiLFFBQUksRUFBRSxFQUFFO0FBQ1IsUUFBSSxFQUFFLEVBQUU7SUFDUixDQUFBOztBQUVELE9BQUksVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7QUFFdEMsYUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBSztBQUM1QixRQUFJLE1BQU0sR0FBRyxPQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQixRQUFJLFFBQVEsR0FBRyxPQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxRQUFJLFFBQVEsRUFBRTtBQUNiLGlCQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQzFCLFNBQUksQ0FBQyxNQUFNLEVBQUU7QUFDWixhQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtNQUN2QjtLQUNELE1BQU0sSUFBSSxNQUFNLEVBQUU7QUFDbEIsWUFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDdkI7SUFDRCxDQUFDLENBQUE7O0FBRUYsT0FBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7QUFDOUIsT0FBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7R0FFcEI7OztTQUVPLGtCQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFOzs7QUFDdEIsU0FBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBSztnQ0FDVixLQUFLOztRQUFmLEVBQUU7UUFBRSxFQUFFOztBQUNYLFFBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLFdBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUIsV0FBSyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUMsQ0FBQTtBQUNGLFVBQU8sSUFBSSxDQUFDO0dBQ1o7OztTQUVPLGtCQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDZCxVQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztHQUNsQzs7O1NBRVcsc0JBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNsQixVQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztHQUN0Qzs7O1FBM0dtQixnQkFBZ0I7OztxQkFBaEIsZ0JBQWdCOztBQStHckMsSUFBTSxLQUFLLEdBQUcsQ0FBQyxZQUFNO0FBQ3BCLEtBQUksSUFBSSxHQUFHLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO0FBQzdCLEtBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFeEIsS0FBSSxRQUFRLEdBQUcsU0FBWCxRQUFRLENBQUksQ0FBQyxFQUFLO0FBQ3JCLE1BQUksU0FBUyxHQUFHLENBQUMsQ0FBQTtBQUNqQixNQUFJLElBQUksR0FBRyxDQUFDLENBQUE7O0FBRVosT0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN2QixPQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFBRSxhQUFTLEVBQUUsQ0FBQztJQUFFO0FBQzNCLElBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ1g7O0FBRUQsTUFBSSxHQUFJLENBQUMsR0FBRyxDQUFDLEFBQUMsQ0FBQztBQUNmLEdBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVYLE9BQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDdkIsT0FBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQUUsYUFBUyxFQUFFLENBQUM7SUFBRTtBQUMzQixJQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUNYOztBQUVELE1BQUksQUFBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLFNBQVMsS0FBSyxDQUFDLElBQ2hDLElBQUksS0FBSyxDQUFDLEtBQUssU0FBUyxLQUFLLENBQUMsSUFBSSxTQUFTLEtBQUssQ0FBQyxDQUFBLEFBQUMsQUFBQyxFQUFFO0FBQ3RELFVBQU8sQ0FBQyxDQUFDO0dBQ1QsTUFFSTtBQUNKLFVBQU8sQ0FBQyxDQUFDO0dBQ1Q7RUFFRCxDQUFBOztBQUVELE1BQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDMUIsT0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN2Qjs7QUFFRCxRQUFPLEtBQUssQ0FBQztDQUNiLENBQUEsRUFBRyxDQUFDOzs7Ozs7OztvQkNoTFksUUFBUTs7Ozt1QkFDTCxXQUFXOzs7O3FCQUNiLFNBQVM7Ozs7bUJBQ1gsT0FBTzs7OztBQUx2QixJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBT2xELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sb0JBQU8sQ0FBQztBQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLHVCQUFVLENBQUM7QUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxxQkFBUSxDQUFDO0FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssbUJBQU0sQ0FBQztBQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztJQ1hKLEtBQUs7VUFBTCxLQUFLO3dCQUFMLEtBQUs7OztjQUFMLEtBQUs7O1NBQ2xCLG1CQUFHLEVBQ1Q7OztTQUVLLGtCQUFHO0FBQ1IsVUFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuQixPQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsT0FBSSxLQUFLLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFHLGNBQWMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7QUFDM0QsT0FBSSxJQUFJLEdBQUcsVUFBVSxDQUFDO0FBQ3RCLE9BQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO0FBQ3hDLE9BQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDekcsT0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQzdCOzs7UUFabUIsS0FBSzs7O3FCQUFMLEtBQUs7Ozs7Ozs7Ozs7Ozs7O0lDQUwsT0FBTztVQUFQLE9BQU87d0JBQVAsT0FBTzs7O2NBQVAsT0FBTzs7U0FDcEIsbUJBQUcsRUFFVDs7O1NBRUssa0JBQUc7QUFDUixVQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZCLE9BQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztHQUMvQjs7O1FBUm1CLE9BQU87OztxQkFBUCxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7O2dDQ0FDLG9CQUFvQjs7Ozt1QkFDN0IsV0FBVzs7OztBQUUvQixJQUFNLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDbkIsSUFBTSxLQUFLLEdBQUcsRUFBQyxJQUFJLEVBQUUsUUFBUSxHQUFHLGNBQWMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUE7O0lBRXhDLEdBQUc7VUFBSCxHQUFHO3dCQUFILEdBQUc7OztjQUFILEdBQUc7O1NBQ2hCLG1CQUFHLEVBRVQ7OztTQUVLLGtCQUFHO0FBQ1IsT0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDO0FBQzFELE9BQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQzs7QUFFNUQsU0FBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLG1DQUFzQixDQUFDOztBQUU3RCxPQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEMsT0FBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQyxDQUFDOztBQUV6QyxPQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7O0FBRWpDLE9BQUksQ0FBQyxNQUFNLEdBQUcseUJBQVksSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDL0QsUUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDeEMsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDekMsU0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFFBQVEsRUFBRSxDQUFDLEdBQUcsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ2xGO0lBQ0Q7O0FBRUQsT0FBSSxDQUFDLElBQUksRUFBRSxDQUFDOztBQUVaLE9BQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO0FBQ3pCLE9BQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0dBRXJCOzs7U0FFSyxrQkFBRztBQUNSLE9BQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQzNDLE9BQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO0FBQzNDLFFBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdkIsUUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFDckIsUUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ1o7R0FFRDs7O1NBRUcsZ0JBQUc7OztBQUNOLE9BQUksUUFBUSxHQUFHLFNBQVgsUUFBUSxDQUFJLElBQUksRUFBSztBQUN4QixXQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBSyxXQUFXLElBQ3pCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBSyxZQUFZLENBQUM7SUFDL0IsQ0FBQTs7QUFFRCxPQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDOztBQUVyQyxPQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBSztBQUMzQixRQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNuQixXQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzdDO0lBQ0QsQ0FBQyxDQUFBOztBQUVGLE9BQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQzNCLFFBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ25CLFdBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDN0M7SUFDRCxDQUFDLENBQUE7R0FFRjs7O1FBOURtQixHQUFHOzs7cUJBQUgsR0FBRyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcnJheTJEIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmNvbnRlbnQgPSBuZXcgQXJyYXkod2lkdGggKiBoZWlnaHQpO1xuICB9XG5cbiAgZ2V0KHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50W3kgKiB0aGlzLndpZHRoICsgeF07XG4gIH1cblxuICBnZXRTcXVhcmUoeCwgeSwgdywgaCkge1xuICAgIGxldCBzcXVhcmUgPSBuZXcgQXJyYXkyRCh3LCBoKVxuICAgIGZvciAobGV0IGk9MDsgaTx3OyBpKyspIHtcbiAgICAgIGZvciAobGV0IGo9MDsgajxoOyBqKyspIHtcbiAgICAgICAgc3F1YXJlLnNldChpLCBqLCB0aGlzLmdldCh4ICsgaSwgeSArIGopKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldCh4LCB5LCBuZXdWYWwpIHtcbiAgICB0aGlzLmNvbnRlbnRbeSAqIHRoaXMud2lkdGggKyB4XSA9IG5ld1ZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGZpbGwoY29udGVudCkge1xuICAgIHRoaXMuZm9yRWFjaCgoXywgeCwgeSkgPT4ge1xuICAgICAgdGhpcy5zZXQoeCwgeSwgY29udGVudCk7XG4gICAgfSlcbiAgfVxuXG4gIGZvckVhY2goY2FsbGJhY2spIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy53aWR0aDsgeCsrKSB7XG4gICAgICAgIGNhbGxiYWNrKHRoaXMuY29udGVudFt5ICogdGhpcy53aWR0aCArIHhdLCB4LCB5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCb290IHtcblx0cHJlbG9hZCgpIHtcblx0fVxuXG5cdGNyZWF0ZSgpIHtcblx0XHRjb25zb2xlLmxvZygnYm9vdCcpO1xuXHRcdHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgncHJlbG9hZCcpO1xuXHR9XG5cbn0iLCJjb25zdCBQRU5UT01JTk8gPSBbXG5cdFstMSwgMF0sXG5cdFswLCAwXSxcblx0WzAsIDFdLFxuXHRbMCwgLTFdLFxuXHRbMSwgLTFdXG5dO1xuXG5jb25zdCBBQ09STiA9IFtcblx0WzAsIDBdLFxuXHRbMSwgMF0sXG5cdFsxLCAtMl0sXG5cdFszLCAtMV0sXG5cdFs0LCAwXSxcblx0WzUsIDBdLFxuXHRbNiwgMF1cbl07XG5cbmNsYXNzIENlbGwge1xuXHRjb25zdHJ1Y3Rvcih4LCB5KSB7XG5cdFx0dGhpcy54ID0geDtcblx0XHR0aGlzLnkgPSB5O1xuXHRcdHRoaXMuaW5kZXggPSB0aGlzLnggKyAnLCcgKyB0aGlzLnk7XG5cdH1cblxuXHR0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5pbmRleDtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYXN0ZXJHYW1lT2ZMaWZlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5jZWxsSW5kZXggPSB7fTtcblx0XHR0aGlzLmRpZmYgPSB7bGl2ZTogW10sIGRlYWQ6IFtdfVxuXHR9XG5cblx0Z2V0RGlmZigpIHtcblx0XHRyZXR1cm4gdGhpcy5kaWZmO1xuXHR9XG5cblx0bmVpZ2hib3Job29kT2YoY2VsbCkge1xuXHRcdGxldCBuZWlnaGJvcmhvb2QgPSBbXTtcblx0XHRmb3IgKGxldCBkeCA9IC0xOyBkeDw9MTsgZHgrKykge1xuXHRcdFx0Zm9yIChsZXQgZHkgPSAtMTsgZHkgPD0xOyBkeSsrKSB7XG5cdFx0XHRcdG5laWdoYm9yaG9vZC5wdXNoKFxuXHRcdFx0XHRcdG5ldyBDZWxsKGNlbGwueCArIGR4LCBjZWxsLnkgKyBkeSlcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG5laWdoYm9yaG9vZDtcblx0fVxuXG5cdGxvb2t1cEluZGV4T2YoY2VsbCkge1xuXHRcdGxldCBpbmRleCA9IDA7XG5cdFx0bGV0IG5laWdoYm9yaG9vZCA9IHRoaXMubmVpZ2hib3Job29kT2YoY2VsbCk7XG5cdFx0Zm9yIChsZXQgaT0wOyBpPDk7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMuY2VsbEluZGV4W25laWdoYm9yaG9vZFtpXV0pIHtcblx0XHRcdFx0aW5kZXggfD0gMSA8PCBpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gaW5kZXg7XG5cdH1cblxuXHRpc0xpdmUoY2VsbCkge1xuXHRcdHJldHVybiB0aGlzLmNlbGxJbmRleFtjZWxsXTtcblx0fVxuXG5cdHdpbGxMaXZlKGNlbGwpIHtcblx0XHRyZXR1cm4gVEFCTEVbdGhpcy5sb29rdXBJbmRleE9mKGNlbGwpXTtcblx0fVxuXG5cdGdldFdvcmtpbmdTZXQoKSB7XG5cdFx0bGV0IHNlZW4gPSB7fTtcblx0XHRsZXQgd29ya2luZ1NldCA9IFtdOyBcblx0XHR0aGlzLmRpZmYubGl2ZS5mb3JFYWNoKChjZWxsKSA9PiB7XG5cdFx0XHR0aGlzLm5laWdoYm9yaG9vZE9mKGNlbGwpLmZvckVhY2goKGNlbGwpID0+IHtcblx0XHRcdFx0aWYgKGNlbGwgJiYgIXNlZW5bY2VsbF0pIHtcblx0XHRcdFx0XHRzZWVuW2NlbGxdID0gdHJ1ZTtcblx0XHRcdFx0XHR3b3JraW5nU2V0LnB1c2goY2VsbCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5kaWZmLmRlYWQuZm9yRWFjaCgoY2VsbCkgPT4ge1xuXHRcdFx0dGhpcy5uZWlnaGJvcmhvb2RPZihjZWxsKS5mb3JFYWNoKChjZWxsKSA9PiB7XG5cdFx0XHRcdGlmIChjZWxsICYmICFzZWVuW2NlbGxdKSB7XG5cdFx0XHRcdFx0c2VlbltjZWxsXSA9IHRydWU7XG5cdFx0XHRcdFx0d29ya2luZ1NldC5wdXNoKGNlbGwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gd29ya2luZ1NldDtcblx0fVxuXG5cdHRpY2soKSB7XG5cdFx0bGV0IG5ld0NlbGxJbmRleCA9IHt9O1xuXHRcdGxldCBuZXdEaWZmID0ge1xuXHRcdFx0bGl2ZTogW10sXG5cdFx0XHRkZWFkOiBbXVxuXHRcdH1cblxuXHRcdGxldCB3b3JraW5nU2V0ID0gdGhpcy5nZXRXb3JraW5nU2V0KCk7XG5cblx0XHR3b3JraW5nU2V0LmZvckVhY2goKGNlbGwpID0+IHtcblx0XHRcdGxldCBpc0xpdmUgPSB0aGlzLmlzTGl2ZShjZWxsKTtcblx0XHRcdGxldCB3aWxsTGl2ZSA9IHRoaXMud2lsbExpdmUoY2VsbCk7XG5cdFx0XHRpZiAod2lsbExpdmUpIHtcblx0XHRcdFx0bmV3Q2VsbEluZGV4W2NlbGxdID0gdHJ1ZTtcblx0XHRcdFx0aWYgKCFpc0xpdmUpIHtcblx0XHRcdFx0XHRuZXdEaWZmLmxpdmUucHVzaChjZWxsKVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKGlzTGl2ZSkge1xuXHRcdFx0XHRuZXdEaWZmLmRlYWQucHVzaChjZWxsKVxuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHR0aGlzLmNlbGxJbmRleCA9IG5ld0NlbGxJbmRleDtcblx0XHR0aGlzLmRpZmYgPSBuZXdEaWZmO1xuXG5cdH1cblxuXHRhZGRTaGFwZSh4LCB5LCBkZWx0YXMpIHtcblx0XHRkZWx0YXMuZm9yRWFjaCgoZGVsdGEpID0+IHtcblx0XHRcdGxldCBbZHgsIGR5XSA9IGRlbHRhO1xuXHRcdFx0bGV0IGNlbGwgPSBuZXcgQ2VsbCh4ICsgZHgsIHkgKyBkeSk7XG5cdFx0XHR0aGlzLmRpZmYubGl2ZS5wdXNoKGNlbGwpO1xuXHRcdFx0dGhpcy5jZWxsSW5kZXhbY2VsbF0gPSB0cnVlO1xuXHRcdH0pXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRBY29ybih4LCB5KSB7XG5cdFx0cmV0dXJuIHRoaXMuYWRkU2hhcGUoeCwgeSwgQUNPUk4pO1xuXHR9XG5cblx0YWRkUGVudG9taW5vKHgsIHkpIHtcblx0XHRyZXR1cm4gdGhpcy5hZGRTaGFwZSh4LCB5LCBQRU5UT01JTk8pO1xuXHR9XG5cbn1cblxuY29uc3QgVEFCTEUgPSAoKCkgPT4ge1xuXHRsZXQgc2l6ZSA9IDkqOCo3KjYqNSo0KjMqMioxO1xuXHRsZXQgdGFibGUgPSBBcnJheShzaXplKTtcblxuXHRsZXQgZXZhbHVhdGUgPSAobikgPT4ge1xuXHRcdGxldCBuZWlnaGJvcnMgPSAwXG5cdFx0bGV0IGNlbGwgPSAwXG5cdFx0XG5cdFx0Zm9yIChsZXQgaT0wOyBpPDQ7IGkrKykge1xuXHRcdFx0aWYgKG4gJiAxKSB7IG5laWdoYm9ycysrOyB9XG5cdFx0XHRuID0gbiA+PiAxO1xuXHRcdH1cblxuXHRcdGNlbGwgPSAobiAmIDEpO1xuXHRcdG4gPSBuID4+IDE7XG5cblx0XHRmb3IgKGxldCBpPTA7IGk8NDsgaSsrKSB7XG5cdFx0XHRpZiAobiAmIDEpIHsgbmVpZ2hib3JzKys7IH1cblx0XHRcdG4gPSBuID4+IDE7XG5cdFx0fVxuXG5cdFx0aWYgKChjZWxsID09PSAwICYmIG5laWdoYm9ycyA9PT0gMykgfHxcblx0XHRcdChjZWxsID09PSAxICYmIChuZWlnaGJvcnMgPT09IDIgfHwgbmVpZ2hib3JzID09PSAzKSkpIHtcblx0XHRcdHJldHVybiAxO1xuXHRcdH1cblxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdH1cblxuXHRmb3IgKGxldCBpPTA7IGk8c2l6ZTsgaSsrKSB7XG5cdFx0dGFibGVbaV0gPSBldmFsdWF0ZShpKTtcblx0fVxuXG5cdHJldHVybiB0YWJsZTtcbn0pKCk7IiwibGV0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoODAwLCA2MDAsIFBoYXNlci5BVVRPKTtcblxuaW1wb3J0IEJvb3QgZnJvbSAnLi9Cb290JztcbmltcG9ydCBQcmVsb2FkIGZyb20gJy4vUHJlbG9hZCc7XG5pbXBvcnQgSW50cm8gZnJvbSAnLi9JbnRybyc7XG5pbXBvcnQgUnVuIGZyb20gJy4vUnVuJztcblxuZ2FtZS5zdGF0ZS5hZGQoJ2Jvb3QnLCBCb290KTtcbmdhbWUuc3RhdGUuYWRkKCdwcmVsb2FkJywgUHJlbG9hZCk7XG5nYW1lLnN0YXRlLmFkZCgnaW50cm8nLCBJbnRybyk7XG5nYW1lLnN0YXRlLmFkZCgncnVuJywgUnVuKTtcbmdhbWUuc3RhdGUuc3RhcnQoJ2Jvb3QnKTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRybyB7XG5cdHByZWxvYWQoKSB7XG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0Y29uc29sZS5sb2coJ2ludHJvJyk7XG4gICAgbGV0IGZvbnRTaXplID0gMzI7XG5cdFx0bGV0IHN0eWxlID0geyBmb250OiBmb250U2l6ZSArIFwicHggbW9ub3NwYWNlXCIsIGZpbGw6IFwiI2ZmZlwifTtcbiAgICBsZXQgdGV4dCA9ICdBdXRvbWF0YSc7XG4gICAgbGV0IHRleHRTaXplID0gdGV4dC5sZW5ndGggKiBmb250U2l6ZTtcblx0XHR0aGlzLmdhbWUuYWRkLnRleHQodGhpcy5nYW1lLndpZHRoLzIgLSB0ZXh0U2l6ZS8zLCB0aGlzLmdhbWUuaGVpZ2h0LzMgLSBmb250U2l6ZSAqIDQsICdBdXRvbWF0YScsIHN0eWxlKTtcblx0XHR0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ3J1bicpO1xuXHR9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkIHtcblx0cHJlbG9hZCgpIHtcblxuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdGNvbnNvbGUubG9nKCdwcmVsb2FkJyk7XG5cdFx0dGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdpbnRybycpO1xuXHR9XG59IiwiaW1wb3J0IEZhc3RlckdhbWVPZkxpZmUgZnJvbSAnLi9GYXN0ZXJHYW1lT2ZMaWZlJztcbmltcG9ydCBBcnJheTJEIGZyb20gJy4vQXJyYXkyRCc7XG5cbmNvbnN0IGZvbnRTaXplID0gNDtcbmNvbnN0IHN0eWxlID0ge2ZvbnQ6IGZvbnRTaXplICsgXCJweCBtb25vc3BhY2VcIiwgZmlsbDogXCIjZmZmXCJ9XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1biB7XG5cdHByZWxvYWQoKSB7XG5cblx0fVxuXG5cdGNyZWF0ZSgpIHtcblx0XHR0aGlzLnNjcmVlbldpZHRoID0gTWF0aC5mbG9vcih0aGlzLmdhbWUud2lkdGggLyBmb250U2l6ZSk7XG5cdFx0dGhpcy5zY3JlZW5IZWlnaHQgPSBNYXRoLmZsb29yKHRoaXMuZ2FtZS5oZWlnaHQgLyBmb250U2l6ZSk7XG5cblx0XHR3aW5kb3cuc2ltdWxhdGlvbiA9IHRoaXMuc2ltdWxhdGlvbiA9IG5ldyBGYXN0ZXJHYW1lT2ZMaWZlKCk7XG5cblx0XHRsZXQgY3ggPSBNYXRoLmZsb29yKHRoaXMuc2NyZWVuV2lkdGgvMik7XG5cdFx0bGV0IGN5ID0gTWF0aC5mbG9vcih0aGlzLnNjcmVlbkhlaWdodC8yKTtcblx0XHRcblx0XHR0aGlzLnNpbXVsYXRpb24uYWRkQWNvcm4oY3gsIGN5KTtcblxuXHRcdHRoaXMuc2NyZWVuID0gbmV3IEFycmF5MkQodGhpcy5zY3JlZW5XaWR0aCwgdGhpcy5zY3JlZW5IZWlnaHQpO1xuXHRcdGZvciAobGV0IHggPSAwOyB4PHRoaXMuc2NyZWVuV2lkdGg7IHgrKykge1xuXHRcdFx0Zm9yIChsZXQgeSA9IDA7IHk8dGhpcy5zY3JlZW5IZWlnaHQ7IHkrKykge1xuXHRcdFx0XHR0aGlzLnNjcmVlbi5zZXQoeCwgeSwgdGhpcy5nYW1lLmFkZC50ZXh0KHggKiBmb250U2l6ZSwgeSAqIGZvbnRTaXplLCAnICcsIHN0eWxlKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5kcmF3KCk7XG5cblx0XHR0aGlzLm1pbGxpc1BlclRpY2sgPSAxNDA7XG5cdFx0dGhpcy5lbGFwc2VkVGltZSA9IDA7XG5cblx0fVxuXG5cdHVwZGF0ZSgpIHtcblx0XHR0aGlzLmVsYXBzZWRUaW1lICs9IHRoaXMuZ2FtZS50aW1lLmVsYXBzZWQ7XG5cdFx0aWYgKHRoaXMuZWxhcHNlZFRpbWUgPj0gdGhpcy5taWxsaXNQZXJUaWNrKSB7XG5cdFx0XHR0aGlzLnNpbXVsYXRpb24udGljaygpO1xuXHRcdFx0dGhpcy5lbGFwc2VkVGltZSA9IDA7XG5cdFx0XHR0aGlzLmRyYXcoKTtcblx0XHR9XG5cdFx0XG5cdH1cblxuXHRkcmF3KCkge1xuXHRcdGxldCBpbkJvdW5kcyA9IChjZWxsKSA9PiB7XG5cdFx0XHRyZXR1cm4gY2VsbC54ID4gMCAmJiBcblx0XHRcdFx0ICAgY2VsbC54IDwgdGhpcy5zY3JlZW5XaWR0aCAmJlxuXHRcdFx0XHQgICBjZWxsLnkgPiAwICYmIFxuXHRcdFx0XHQgICBjZWxsLnkgPCB0aGlzLnNjcmVlbkhlaWdodDtcblx0XHR9XG5cblx0XHRsZXQgZGlmZiA9IHRoaXMuc2ltdWxhdGlvbi5nZXREaWZmKCk7XG5cblx0XHRkaWZmLmxpdmUuZm9yRWFjaCgoY2VsbCkgPT4ge1xuXHRcdFx0aWYgKGluQm91bmRzKGNlbGwpKSB7XG5cdFx0XHRcdHRoaXMuc2NyZWVuLmdldChjZWxsLngsIGNlbGwueSkuc2V0VGV4dCgnKicpO1xuXHRcdFx0fSBcblx0XHR9KVxuXG5cdFx0ZGlmZi5kZWFkLmZvckVhY2goKGNlbGwpID0+IHtcblx0XHRcdGlmIChpbkJvdW5kcyhjZWxsKSkge1xuXHRcdFx0XHR0aGlzLnNjcmVlbi5nZXQoY2VsbC54LCBjZWxsLnkpLnNldFRleHQoJyAnKTtcblx0XHRcdH1cblx0XHR9KVxuXG5cdH1cbn0iXX0=
