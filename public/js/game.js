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

var SIZE = 8;
var WORKING_COLOR = 2236962;
var LIVE_COLOR = 11149858;
var DEAD_COLOR = 0;

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
			console.log('run');

			this.screenWidth = Math.floor(this.game.width / SIZE);
			this.screenHeight = Math.floor(this.game.height / SIZE);

			window.simulation = this.simulation = new _FasterGameOfLife2['default']();

			var cx = Math.floor(this.screenWidth / 2);
			var cy = Math.floor(this.screenHeight / 2);

			this.simulation.addAcorn(cx, cy);

			this.game.add.sprite(0, 0, this.screen);

			this.millisPerTick = 125;
			this.millisSinceLastTick = 0;

			this.gfx = this.game.add.graphics(0, 0);
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

			diff.dead.forEach(function (cell) {
				if (inBounds(cell)) {
					_this.gfx.beginFill(DEAD_COLOR);
					_this.gfx.drawRect(cell.x * SIZE, cell.y * SIZE, SIZE, SIZE);
					_this.gfx.endFill();
				}
			});

			diff.live.forEach(function (cell) {
				if (inBounds(cell)) {
					_this.gfx.beginFill(LIVE_COLOR);
					_this.gfx.drawRect(cell.x * SIZE, cell.y * SIZE, SIZE, SIZE);
					_this.gfx.endFill();
				}
			});
		}
	}]);

	return Run;
})();

exports['default'] = Run;
module.exports = exports['default'];

},{"./Array2D":1,"./FasterGameOfLife":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0FycmF5MkQuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0Jvb3QuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0Zhc3RlckdhbWVPZkxpZmUuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0dhbWUuanMiLCIvVXNlcnMvYWJvZWtob2ZmL1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0ludHJvLmpzIiwiL1VzZXJzL2Fib2VraG9mZi9Qcm9qZWN0cy9waGFzZXItZ2FtZS1vZi1saWZlL3NyYy9QcmVsb2FkLmpzIiwiL1VzZXJzL2Fib2VraG9mZi9Qcm9qZWN0cy9waGFzZXItZ2FtZS1vZi1saWZlL3NyYy9SdW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0lDQXFCLE9BQU87QUFDZixXQURRLE9BQU8sQ0FDZCxLQUFLLEVBQUUsTUFBTSxFQUFFOzBCQURSLE9BQU87O0FBRXhCLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFFBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFFBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0dBQzFDOztlQUxrQixPQUFPOztXQU92QixhQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDUixhQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDekM7OztX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LElBQUksQ0FBQyxFQUFFO0FBQ25CLFdBQUssR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMvQixXQUFLLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVELFdBQUssR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ25CO0lBQ0QsQ0FBQyxDQUFBO0dBRUY7OztRQTlEbUIsR0FBRzs7O3FCQUFILEdBQUciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJyYXkyRCB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5jb250ZW50ID0gbmV3IEFycmF5KHdpZHRoICogaGVpZ2h0KTtcbiAgfVxuXG4gIGdldCh4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudFt5ICogdGhpcy53aWR0aCArIHhdO1xuICB9XG5cbiAgZ2V0U3F1YXJlKHgsIHksIHcsIGgpIHtcbiAgICBsZXQgc3F1YXJlID0gbmV3IEFycmF5MkQodywgaClcbiAgICBmb3IgKGxldCBpPTA7IGk8dzsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqPTA7IGo8aDsgaisrKSB7XG4gICAgICAgIHNxdWFyZS5zZXQoaSwgaiwgdGhpcy5nZXQoeCArIGksIHkgKyBqKSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXQoeCwgeSwgbmV3VmFsKSB7XG4gICAgdGhpcy5jb250ZW50W3kgKiB0aGlzLndpZHRoICsgeF0gPSBuZXdWYWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmaWxsKGNvbnRlbnQpIHtcbiAgICB0aGlzLmZvckVhY2goKF8sIHgsIHkpID0+IHtcbiAgICAgIHRoaXMuc2V0KHgsIHksIGNvbnRlbnQpO1xuICAgIH0pXG4gIH1cblxuICBmb3JFYWNoKGNhbGxiYWNrKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICBjYWxsYmFjayh0aGlzLmNvbnRlbnRbeSAqIHRoaXMud2lkdGggKyB4XSwgeCwgeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9vdCB7XG5cdHByZWxvYWQoKSB7XG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0Y29uc29sZS5sb2coJ2Jvb3QnKTtcblx0XHR0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ3ByZWxvYWQnKTtcblx0fVxuXG59IiwiY29uc3QgUEVOVE9NSU5PID0gW1xuXHRbLTEsIDBdLFxuXHRbMCwgMF0sXG5cdFswLCAxXSxcblx0WzAsIC0xXSxcblx0WzEsIC0xXVxuXTtcblxuY29uc3QgQUNPUk4gPSBbXG5cdFswLCAwXSxcblx0WzEsIDBdLFxuXHRbMSwgLTJdLFxuXHRbMywgLTFdLFxuXHRbNCwgMF0sXG5cdFs1LCAwXSxcblx0WzYsIDBdXG5dO1xuXG5jbGFzcyBDZWxsIHtcblx0Y29uc3RydWN0b3IoeCwgeSkge1xuXHRcdHRoaXMueCA9IHg7XG5cdFx0dGhpcy55ID0geTtcblx0XHR0aGlzLmluZGV4ID0gdGhpcy54ICsgJywnICsgdGhpcy55O1xuXHR9XG5cblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaW5kZXg7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmFzdGVyR2FtZU9mTGlmZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuZGlmZiA9IG51bGw7XG5cdFx0dGhpcy5jZWxscyA9IFtdO1xuXHRcdHRoaXMuY2VsbEluZGV4ID0ge307XG5cdH1cblxuXHRnZXREaWZmKCkge1xuXHRcdHJldHVybiB0aGlzLmRpZmYgfHwge2xpdmU6IHRoaXMuY2VsbHMsIGRlYWQ6IFtdfVxuXHR9XG5cblx0bmVpZ2hib3Job29kT2YoY2VsbCkge1xuXHRcdGxldCBuZWlnaGJvcmhvb2QgPSBbXTtcblx0XHRmb3IgKGxldCBkeCA9IC0xOyBkeDw9MTsgZHgrKykge1xuXHRcdFx0Zm9yIChsZXQgZHkgPSAtMTsgZHkgPD0xOyBkeSsrKSB7XG5cdFx0XHRcdG5laWdoYm9yaG9vZC5wdXNoKFxuXHRcdFx0XHRcdG5ldyBDZWxsKGNlbGwueCArIGR4LCBjZWxsLnkgKyBkeSlcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG5laWdoYm9yaG9vZDtcblx0fVxuXG5cdGxvb2t1cEluZGV4T2YoY2VsbCkge1xuXHRcdGxldCBpbmRleCA9IDA7XG5cdFx0bGV0IG5laWdoYm9yaG9vZCA9IHRoaXMubmVpZ2hib3Job29kT2YoY2VsbCk7XG5cdFx0Zm9yIChsZXQgaT0wOyBpPDk7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMuY2VsbEluZGV4W25laWdoYm9yaG9vZFtpXV0pIHtcblx0XHRcdFx0aW5kZXggfD0gMSA8PCBpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gaW5kZXg7XG5cdH1cblxuXHRpc0FsaXZlKGNlbGwpIHtcblx0XHRyZXR1cm4gdGhpcy5jZWxsSW5kZXhbY2VsbF07XG5cdH1cblxuXHR3aWxsTGl2ZShjZWxsKSB7XG5cdFx0cmV0dXJuIFRBQkxFW3RoaXMubG9va3VwSW5kZXhPZihjZWxsKV07XG5cdH1cblxuXHRnZXRXb3JraW5nU2V0KCkge1xuXHRcdGxldCBzZWVuID0ge307XG5cdFx0bGV0IHdvcmtpbmdTZXQgPSBbXTsgXG5cdFx0dGhpcy5jZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG5cdFx0XHR0aGlzLm5laWdoYm9yaG9vZE9mKGNlbGwpLmZvckVhY2goKGNlbGwpID0+IHtcblx0XHRcdFx0aWYgKGNlbGwgJiYgIXNlZW5bY2VsbF0pIHtcblx0XHRcdFx0XHRzZWVuW2NlbGxdID0gdHJ1ZTtcblx0XHRcdFx0XHR3b3JraW5nU2V0LnB1c2goY2VsbCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiB3b3JraW5nU2V0O1xuXHR9XG5cblx0dGljaygpIHtcblx0XHRsZXQgbmV3Q2VsbHMgPSBbXTtcblx0XHRsZXQgbmV3Q2VsbEluZGV4ID0ge307XG5cdFx0bGV0IGRpZmYgPSB7XG5cdFx0XHRsaXZlOiBbXSxcblx0XHRcdGRlYWQ6IFtdXG5cdFx0fVxuXG5cdFx0dGhpcy5nZXRXb3JraW5nU2V0KCkuZm9yRWFjaCgoY2VsbCkgPT4ge1xuXHRcdFx0bGV0IGlzTGl2ZSA9IHRoaXMuaXNBbGl2ZShjZWxsKTtcblx0XHRcdGxldCB3aWxsTGl2ZSA9IHRoaXMud2lsbExpdmUoY2VsbCk7XG5cdFx0XHRpZiAod2lsbExpdmUpIHtcblx0XHRcdFx0bmV3Q2VsbHMucHVzaChjZWxsKTtcblx0XHRcdFx0bmV3Q2VsbEluZGV4W2NlbGxdID0gdHJ1ZTtcblx0XHRcdFx0aWYgKCFpc0xpdmUpIHtcblx0XHRcdFx0XHRkaWZmLmxpdmUucHVzaChjZWxsKVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKGlzTGl2ZSkge1xuXHRcdFx0XHRkaWZmLmRlYWQucHVzaChjZWxsKVxuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHR0aGlzLmNlbGxzID0gbmV3Q2VsbHM7XG5cdFx0dGhpcy5jZWxsSW5kZXggPSBuZXdDZWxsSW5kZXg7XG5cdFx0dGhpcy5kaWZmID0gZGlmZjtcblxuXHR9XG5cblx0YWRkU2hhcGUoeCwgeSwgZGVsdGFzKSB7XG5cdFx0ZGVsdGFzLmZvckVhY2goKGRlbHRhKSA9PiB7XG5cdFx0XHRsZXQgW2R4LCBkeV0gPSBkZWx0YTtcblx0XHRcdGxldCBjZWxsID0gbmV3IENlbGwoeCArIGR4LCB5ICsgZHkpO1xuXHRcdFx0dGhpcy5jZWxscy5wdXNoKGNlbGwpO1xuXHRcdFx0dGhpcy5jZWxsSW5kZXhbY2VsbF0gPSB0cnVlO1xuXHRcdH0pXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRBY29ybih4LCB5KSB7XG5cdFx0cmV0dXJuIHRoaXMuYWRkU2hhcGUoeCwgeSwgQUNPUk4pO1xuXHR9XG5cblx0YWRkUGVudG9taW5vKHgsIHkpIHtcblx0XHRyZXR1cm4gdGhpcy5hZGRTaGFwZSh4LCB5LCBQRU5UT01JTk8pO1xuXHR9XG5cbn1cblxuY29uc3QgVEFCTEUgPSAoKCkgPT4ge1xuXHRsZXQgc2l6ZSA9IDkqOCo3KjYqNSo0KjMqMioxO1xuXHRsZXQgdGFibGUgPSBBcnJheShzaXplKTtcblxuXHRsZXQgZXZhbHVhdGUgPSAobikgPT4ge1xuXHRcdGxldCBuZWlnaGJvcnMgPSAwXG5cdFx0bGV0IGNlbGwgPSAwXG5cdFx0XG5cdFx0Zm9yIChsZXQgaT0wOyBpPDQ7IGkrKykge1xuXHRcdFx0aWYgKG4gJiAxKSB7IG5laWdoYm9ycysrOyB9XG5cdFx0XHRuID0gbiA+PiAxO1xuXHRcdH1cblxuXHRcdGNlbGwgPSBuICYgMTtcblx0XHRuID0gbiA+PiAxO1xuXG5cdFx0Zm9yIChsZXQgaT0wOyBpPDQ7IGkrKykge1xuXHRcdFx0aWYgKG4gJiAxKSB7IG5laWdoYm9ycysrOyB9XG5cdFx0XHRuID0gbiA+PiAxO1xuXHRcdH1cblxuXHRcdGlmICgoY2VsbCA9PT0gMCAmJiBuZWlnaGJvcnMgPT09IDMpIHx8XG5cdFx0XHQoY2VsbCA9PT0gMSAmJiAobmVpZ2hib3JzID09PSAyIHx8IG5laWdoYm9ycyA9PT0gMykpKSB7XG5cdFx0XHRyZXR1cm4gMTtcblx0XHR9XG5cblx0XHRlbHNlIHtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblxuXHR9XG5cblx0Zm9yIChsZXQgaT0wOyBpPHNpemU7IGkrKykge1xuXHRcdHRhYmxlW2ldID0gZXZhbHVhdGUoaSk7XG5cdH1cblxuXHRyZXR1cm4gdGFibGU7XG59KSgpOyIsImxldCBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDEwMDAsIDgwMCwgUGhhc2VyLkFVVE8pO1xuXG5pbXBvcnQgQm9vdCBmcm9tICcuL0Jvb3QnO1xuaW1wb3J0IFByZWxvYWQgZnJvbSAnLi9QcmVsb2FkJztcbmltcG9ydCBJbnRybyBmcm9tICcuL0ludHJvJztcbmltcG9ydCBSdW4gZnJvbSAnLi9SdW4nO1xuXG5nYW1lLnN0YXRlLmFkZCgnYm9vdCcsIEJvb3QpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3ByZWxvYWQnLCBQcmVsb2FkKTtcbmdhbWUuc3RhdGUuYWRkKCdpbnRybycsIEludHJvKTtcbmdhbWUuc3RhdGUuYWRkKCdydW4nLCBSdW4pO1xuZ2FtZS5zdGF0ZS5zdGFydCgnYm9vdCcpOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEludHJvIHtcblx0cHJlbG9hZCgpIHtcblx0fVxuXG5cdGNyZWF0ZSgpIHtcblx0XHRjb25zb2xlLmxvZygnaW50cm8nKTtcbiAgICBsZXQgZm9udFNpemUgPSAzMjtcblx0XHRsZXQgc3R5bGUgPSB7IGZvbnQ6IGZvbnRTaXplICsgXCJweCBtb25vc3BhY2VcIiwgZmlsbDogXCIjZmZmXCJ9O1xuICAgIGxldCB0ZXh0ID0gJ0F1dG9tYXRhJztcbiAgICBsZXQgdGV4dFNpemUgPSB0ZXh0Lmxlbmd0aCAqIGZvbnRTaXplO1xuXHRcdHRoaXMuZ2FtZS5hZGQudGV4dCh0aGlzLmdhbWUud2lkdGgvMiAtIHRleHRTaXplLzMsIHRoaXMuZ2FtZS5oZWlnaHQvMyAtIGZvbnRTaXplICogNCwgJ0F1dG9tYXRhJywgc3R5bGUpO1xuXHRcdHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgncnVuJyk7XG5cdH1cblxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZWxvYWQge1xuXHRwcmVsb2FkKCkge1xuXG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0Y29uc29sZS5sb2coJ3ByZWxvYWQnKTtcblx0XHR0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ2ludHJvJyk7XG5cdH1cbn0iLCJpbXBvcnQgRmFzdGVyR2FtZU9mTGlmZSBmcm9tICcuL0Zhc3RlckdhbWVPZkxpZmUnO1xuaW1wb3J0IEFycmF5MkQgZnJvbSAnLi9BcnJheTJEJztcblxuY29uc3QgU0laRSA9IDg7XG5jb25zdCBXT1JLSU5HX0NPTE9SID0gMHgyMjIyMjI7XG5jb25zdCBMSVZFX0NPTE9SID0gMHhBQTIyMjI7XG5jb25zdCBERUFEX0NPTE9SID0gMHgwMDAwMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1biB7XG5cdHByZWxvYWQoKSB7XG5cblx0fVxuXG5cdGNyZWF0ZSgpIHtcblx0XHRjb25zb2xlLmxvZygncnVuJyk7XG5cblx0XHR0aGlzLnNjcmVlbldpZHRoID0gTWF0aC5mbG9vcih0aGlzLmdhbWUud2lkdGggLyBTSVpFKTtcblx0XHR0aGlzLnNjcmVlbkhlaWdodCA9IE1hdGguZmxvb3IodGhpcy5nYW1lLmhlaWdodCAvIFNJWkUpO1xuXG5cdFx0d2luZG93LnNpbXVsYXRpb24gPSB0aGlzLnNpbXVsYXRpb24gPSBuZXcgRmFzdGVyR2FtZU9mTGlmZSgpO1xuXG5cdFx0bGV0IGN4ID0gTWF0aC5mbG9vcih0aGlzLnNjcmVlbldpZHRoLzIpO1xuXHRcdGxldCBjeSA9IE1hdGguZmxvb3IodGhpcy5zY3JlZW5IZWlnaHQvMik7XG5cdFx0XG5cdFx0dGhpcy5zaW11bGF0aW9uLmFkZEFjb3JuKGN4LCBjeSk7XG5cblx0XHR0aGlzLmdhbWUuYWRkLnNwcml0ZSgwLCAwLCB0aGlzLnNjcmVlbik7XG5cblx0XHR0aGlzLm1pbGxpc1BlclRpY2sgPSAxMjU7XG5cdFx0dGhpcy5taWxsaXNTaW5jZUxhc3RUaWNrID0gMDtcblxuXHRcdHRoaXMuZ2Z4ID0gdGhpcy5nYW1lLmFkZC5ncmFwaGljcygwLCAwKTtcblxuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdHRoaXMubWlsbGlzU2luY2VMYXN0VGljayArPSB0aGlzLmdhbWUudGltZS5lbGFwc2VkO1xuXHRcdGlmICh0aGlzLm1pbGxpc1NpbmNlTGFzdFRpY2sgPj0gdGhpcy5taWxsaXNQZXJUaWNrKSB7XG5cdFx0XHR0aGlzLm1pbGxpc1NpbmNlTGFzdFRpY2sgPSAwO1xuXHRcdFx0dGhpcy5zaW11bGF0aW9uLnRpY2soKTtcblx0XHRcdHRoaXMuZHJhdygpO1xuXHRcdH1cblx0fVxuXG5cdGRyYXcoKSB7XG5cdFx0bGV0IGluQm91bmRzID0gKGNlbGwpID0+IHtcblx0XHRcdHJldHVybiBjZWxsLnggPiAwICYmIFxuXHRcdFx0XHQgICBjZWxsLnggPCB0aGlzLnNjcmVlbldpZHRoICYmXG5cdFx0XHRcdCAgIGNlbGwueSA+IDAgJiYgXG5cdFx0XHRcdCAgIGNlbGwueSA8IHRoaXMuc2NyZWVuSGVpZ2h0O1xuXHRcdH1cblxuXHRcdGxldCBkaWZmID0gdGhpcy5zaW11bGF0aW9uLmdldERpZmYoKTtcblxuXHRcdGRpZmYuZGVhZC5mb3JFYWNoKChjZWxsKSA9PiB7XG5cdFx0XHRpZiAoaW5Cb3VuZHMoY2VsbCkpIHtcblx0XHRcdFx0dGhpcy5nZnguYmVnaW5GaWxsKERFQURfQ09MT1IpO1xuXHRcdFx0XHR0aGlzLmdmeC5kcmF3UmVjdChjZWxsLnggKiBTSVpFLCBjZWxsLnkgKiBTSVpFLCBTSVpFLCBTSVpFKTtcblx0XHRcdFx0dGhpcy5nZnguZW5kRmlsbCgpO1xuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHRkaWZmLmxpdmUuZm9yRWFjaCgoY2VsbCkgPT4ge1xuXHRcdFx0aWYgKGluQm91bmRzKGNlbGwpKSB7XG5cdFx0XHRcdHRoaXMuZ2Z4LmJlZ2luRmlsbChMSVZFX0NPTE9SKTtcblx0XHRcdFx0dGhpcy5nZnguZHJhd1JlY3QoY2VsbC54ICogU0laRSwgY2VsbC55ICogU0laRSwgU0laRSwgU0laRSk7XG5cdFx0XHRcdHRoaXMuZ2Z4LmVuZEZpbGwoKTtcblx0XHRcdH1cblx0XHR9KVxuXG5cdH1cbn0iXX0=
