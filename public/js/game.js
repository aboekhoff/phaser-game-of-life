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
				console.log(delta, dx, dy, cell);
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

var game = new Phaser.Game(1000, 1200, Phaser.AUTO);

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

			console.log(simulation);
		}
	}, {
		key: 'update',
		value: function update() {
			this.simulation.tick();
			this.draw();
			// this.simulation.tick();
			// console.log(this.simulation);
			// this.draw();
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYW5keS9Qcm9qZWN0cy9waGFzZXItZ2FtZS1vZi1saWZlL3NyYy9BcnJheTJELmpzIiwiL1VzZXJzL2FuZHkvUHJvamVjdHMvcGhhc2VyLWdhbWUtb2YtbGlmZS9zcmMvQm9vdC5qcyIsIi9Vc2Vycy9hbmR5L1Byb2plY3RzL3BoYXNlci1nYW1lLW9mLWxpZmUvc3JjL0Zhc3RlckdhbWVPZkxpZmUuanMiLCIvVXNlcnMvYW5keS9Qcm9qZWN0cy9waGFzZXItZ2FtZS1vZi1saWZlL3NyYy9HYW1lLmpzIiwiL1VzZXJzL2FuZHkvUHJvamVjdHMvcGhhc2VyLWdhbWUtb2YtbGlmZS9zcmMvSW50cm8uanMiLCIvVXNlcnMvYW5keS9Qcm9qZWN0cy9waGFzZXItZ2FtZS1vZi1saWZlL3NyYy9QcmVsb2FkLmpzIiwiL1VzZXJzL2FuZHkvUHJvamVjdHMvcGhhc2VyLWdhbWUtb2YtbGlmZS9zcmMvUnVuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FxQixPQUFPO0FBQ2YsV0FEUSxPQUFPLENBQ2QsS0FBSyxFQUFFLE1BQU0sRUFBRTswQkFEUixPQUFPOztBQUV4QixRQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixRQUFJLENBQUMsT0FBTyxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQztHQUMxQzs7ZUFMa0IsT0FBTzs7V0FPdkIsYUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ1IsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3pDOzs7V0FFUSxtQkFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMs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QUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzdDO0lBQ0QsQ0FBQyxDQUFBO0dBRUY7OztRQTNEbUIsR0FBRzs7O3FCQUFILEdBQUciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJyYXkyRCB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5jb250ZW50ID0gbmV3IEFycmF5KHdpZHRoICogaGVpZ2h0KTtcbiAgfVxuXG4gIGdldCh4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudFt5ICogdGhpcy53aWR0aCArIHhdO1xuICB9XG5cbiAgZ2V0U3F1YXJlKHgsIHksIHcsIGgpIHtcbiAgICBsZXQgc3F1YXJlID0gbmV3IEFycmF5MkQodywgaClcbiAgICBmb3IgKGxldCBpPTA7IGk8dzsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqPTA7IGo8aDsgaisrKSB7XG4gICAgICAgIHNxdWFyZS5zZXQoaSwgaiwgdGhpcy5nZXQoeCArIGksIHkgKyBqKSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXQoeCwgeSwgbmV3VmFsKSB7XG4gICAgdGhpcy5jb250ZW50W3kgKiB0aGlzLndpZHRoICsgeF0gPSBuZXdWYWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmaWxsKGNvbnRlbnQpIHtcbiAgICB0aGlzLmZvckVhY2goKF8sIHgsIHkpID0+IHtcbiAgICAgIHRoaXMuc2V0KHgsIHksIGNvbnRlbnQpO1xuICAgIH0pXG4gIH1cblxuICBmb3JFYWNoKGNhbGxiYWNrKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICBjYWxsYmFjayh0aGlzLmNvbnRlbnRbeSAqIHRoaXMud2lkdGggKyB4XSwgeCwgeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9vdCB7XG5cdHByZWxvYWQoKSB7XG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0Y29uc29sZS5sb2coJ2Jvb3QnKTtcblx0XHR0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ3ByZWxvYWQnKTtcblx0fVxuXG59IiwiY29uc3QgUEVOVE9NSU5PID0gW1xuXHRbLTEsIDBdLFxuXHRbMCwgMF0sXG5cdFswLCAxXSxcblx0WzAsIC0xXSxcblx0WzEsIC0xXVxuXTtcblxuY29uc3QgQUNPUk4gPSBbXG5cdFswLCAwXSxcblx0WzEsIDBdLFxuXHRbMSwgLTJdLFxuXHRbMywgLTFdLFxuXHRbNCwgMF0sXG5cdFs1LCAwXSxcblx0WzYsIDBdXG5dO1xuXG5jbGFzcyBDZWxsIHtcblx0Y29uc3RydWN0b3IoeCwgeSkge1xuXHRcdHRoaXMueCA9IHg7XG5cdFx0dGhpcy55ID0geTtcblx0XHR0aGlzLmluZGV4ID0gdGhpcy54ICsgJywnICsgdGhpcy55O1xuXHR9XG5cblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaW5kZXg7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmFzdGVyR2FtZU9mTGlmZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuZGlmZiA9IG51bGw7XG5cdFx0dGhpcy5jZWxscyA9IFtdO1xuXHRcdHRoaXMuY2VsbEluZGV4ID0ge307XG5cdH1cblxuXHRnZXREaWZmKCkge1xuXHRcdHJldHVybiB0aGlzLmRpZmYgfHwge2xpdmU6IHRoaXMuY2VsbHMsIGRlYWQ6IFtdfVxuXHR9XG5cblx0bmVpZ2hib3Job29kT2YoY2VsbCkge1xuXHRcdGxldCBuZWlnaGJvcmhvb2QgPSBbXTtcblx0XHRmb3IgKGxldCBkeCA9IC0xOyBkeDw9MTsgZHgrKykge1xuXHRcdFx0Zm9yIChsZXQgZHkgPSAtMTsgZHkgPD0xOyBkeSsrKSB7XG5cdFx0XHRcdG5laWdoYm9yaG9vZC5wdXNoKFxuXHRcdFx0XHRcdG5ldyBDZWxsKGNlbGwueCArIGR4LCBjZWxsLnkgKyBkeSlcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG5laWdoYm9yaG9vZDtcblx0fVxuXG5cdGxvb2t1cEluZGV4T2YoY2VsbCkge1xuXHRcdGxldCBpbmRleCA9IDA7XG5cdFx0bGV0IG5laWdoYm9yaG9vZCA9IHRoaXMubmVpZ2hib3Job29kT2YoY2VsbCk7XG5cdFx0Zm9yIChsZXQgaT0wOyBpPDk7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMuY2VsbEluZGV4W25laWdoYm9yaG9vZFtpXV0pIHtcblx0XHRcdFx0aW5kZXggfD0gMSA8PCBpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gaW5kZXg7XG5cdH1cblxuXHRpc0FsaXZlKGNlbGwpIHtcblx0XHRyZXR1cm4gdGhpcy5jZWxsSW5kZXhbY2VsbF07XG5cdH1cblxuXHR3aWxsTGl2ZShjZWxsKSB7XG5cdFx0cmV0dXJuIFRBQkxFW3RoaXMubG9va3VwSW5kZXhPZihjZWxsKV07XG5cdH1cblxuXHRnZXRXb3JraW5nU2V0KCkge1xuXHRcdGxldCBzZWVuID0ge307XG5cdFx0bGV0IHdvcmtpbmdTZXQgPSBbXTsgXG5cdFx0dGhpcy5jZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG5cdFx0XHR0aGlzLm5laWdoYm9yaG9vZE9mKGNlbGwpLmZvckVhY2goKGNlbGwpID0+IHtcblx0XHRcdFx0aWYgKGNlbGwgJiYgIXNlZW5bY2VsbF0pIHtcblx0XHRcdFx0XHRzZWVuW2NlbGxdID0gdHJ1ZTtcblx0XHRcdFx0XHR3b3JraW5nU2V0LnB1c2goY2VsbCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiB3b3JraW5nU2V0O1xuXHR9XG5cblx0dGljaygpIHtcblx0XHRsZXQgbmV3Q2VsbHMgPSBbXTtcblx0XHRsZXQgbmV3Q2VsbEluZGV4ID0ge307XG5cdFx0bGV0IGRpZmYgPSB7XG5cdFx0XHRsaXZlOiBbXSxcblx0XHRcdGRlYWQ6IFtdXG5cdFx0fVxuXG5cdFx0dGhpcy5nZXRXb3JraW5nU2V0KCkuZm9yRWFjaCgoY2VsbCkgPT4ge1xuXHRcdFx0bGV0IGlzTGl2ZSA9IHRoaXMuaXNBbGl2ZShjZWxsKTtcblx0XHRcdGxldCB3aWxsTGl2ZSA9IHRoaXMud2lsbExpdmUoY2VsbCk7XG5cdFx0XHRpZiAod2lsbExpdmUpIHtcblx0XHRcdFx0bmV3Q2VsbHMucHVzaChjZWxsKTtcblx0XHRcdFx0bmV3Q2VsbEluZGV4W2NlbGxdID0gdHJ1ZTtcblx0XHRcdFx0aWYgKCFpc0xpdmUpIHtcblx0XHRcdFx0XHRkaWZmLmxpdmUucHVzaChjZWxsKVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKGlzTGl2ZSkge1xuXHRcdFx0XHRkaWZmLmRlYWQucHVzaChjZWxsKVxuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHR0aGlzLmNlbGxzID0gbmV3Q2VsbHM7XG5cdFx0dGhpcy5jZWxsSW5kZXggPSBuZXdDZWxsSW5kZXg7XG5cdFx0dGhpcy5kaWZmID0gZGlmZjtcblxuXHR9XG5cblx0YWRkU2hhcGUoeCwgeSwgZGVsdGFzKSB7XG5cdFx0ZGVsdGFzLmZvckVhY2goKGRlbHRhKSA9PiB7XG5cdFx0XHRsZXQgW2R4LCBkeV0gPSBkZWx0YTtcblx0XHRcdGxldCBjZWxsID0gbmV3IENlbGwoeCArIGR4LCB5ICsgZHkpO1xuXHRcdFx0Y29uc29sZS5sb2coZGVsdGEsIGR4LCBkeSwgY2VsbCk7XG5cdFx0XHR0aGlzLmNlbGxzLnB1c2goY2VsbCk7XG5cdFx0XHR0aGlzLmNlbGxJbmRleFtjZWxsXSA9IHRydWU7XG5cdFx0fSlcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZEFjb3JuKHgsIHkpIHtcblx0XHRyZXR1cm4gdGhpcy5hZGRTaGFwZSh4LCB5LCBBQ09STik7XG5cdH1cblxuXHRhZGRQZW50b21pbm8oeCwgeSkge1xuXHRcdHJldHVybiB0aGlzLmFkZFNoYXBlKHgsIHksIFBFTlRPTUlOTyk7XG5cdH1cblxufVxuXG5jb25zdCBUQUJMRSA9ICgoKSA9PiB7XG5cdGxldCBzaXplID0gOSo4KjcqNio1KjQqMyoyKjE7XG5cdGxldCB0YWJsZSA9IEFycmF5KHNpemUpO1xuXG5cdGxldCBldmFsdWF0ZSA9IChuKSA9PiB7XG5cdFx0bGV0IG5laWdoYm9ycyA9IDBcblx0XHRsZXQgY2VsbCA9IDBcblx0XHRcblx0XHRmb3IgKGxldCBpPTA7IGk8NDsgaSsrKSB7XG5cdFx0XHRpZiAobiAmIDEpIHsgbmVpZ2hib3JzKys7IH1cblx0XHRcdG4gPSBuID4+IDE7XG5cdFx0fVxuXG5cdFx0Y2VsbCA9IG4gJiAxO1xuXHRcdG4gPSBuID4+IDE7XG5cblx0XHRmb3IgKGxldCBpPTA7IGk8NDsgaSsrKSB7XG5cdFx0XHRpZiAobiAmIDEpIHsgbmVpZ2hib3JzKys7IH1cblx0XHRcdG4gPSBuID4+IDE7XG5cdFx0fVxuXG5cdFx0aWYgKChjZWxsID09PSAwICYmIG5laWdoYm9ycyA9PT0gMykgfHxcblx0XHRcdChjZWxsID09PSAxICYmIChuZWlnaGJvcnMgPT09IDIgfHwgbmVpZ2hib3JzID09PSAzKSkpIHtcblx0XHRcdHJldHVybiAxO1xuXHRcdH1cblxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdH1cblxuXHRmb3IgKGxldCBpPTA7IGk8c2l6ZTsgaSsrKSB7XG5cdFx0dGFibGVbaV0gPSBldmFsdWF0ZShpKTtcblx0fVxuXG5cdHJldHVybiB0YWJsZTtcbn0pKCk7IiwibGV0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoMTAwMCwgMTIwMCwgUGhhc2VyLkFVVE8pO1xuXG5pbXBvcnQgQm9vdCBmcm9tICcuL0Jvb3QnO1xuaW1wb3J0IFByZWxvYWQgZnJvbSAnLi9QcmVsb2FkJztcbmltcG9ydCBJbnRybyBmcm9tICcuL0ludHJvJztcbmltcG9ydCBSdW4gZnJvbSAnLi9SdW4nO1xuXG5nYW1lLnN0YXRlLmFkZCgnYm9vdCcsIEJvb3QpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3ByZWxvYWQnLCBQcmVsb2FkKTtcbmdhbWUuc3RhdGUuYWRkKCdpbnRybycsIEludHJvKTtcbmdhbWUuc3RhdGUuYWRkKCdydW4nLCBSdW4pO1xuZ2FtZS5zdGF0ZS5zdGFydCgnYm9vdCcpOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEludHJvIHtcblx0cHJlbG9hZCgpIHtcblx0fVxuXG5cdGNyZWF0ZSgpIHtcblx0XHRjb25zb2xlLmxvZygnaW50cm8nKTtcbiAgICBsZXQgZm9udFNpemUgPSAzMjtcblx0XHRsZXQgc3R5bGUgPSB7IGZvbnQ6IGZvbnRTaXplICsgXCJweCBtb25vc3BhY2VcIiwgZmlsbDogXCIjZmZmXCJ9O1xuICAgIGxldCB0ZXh0ID0gJ0F1dG9tYXRhJztcbiAgICBsZXQgdGV4dFNpemUgPSB0ZXh0Lmxlbmd0aCAqIGZvbnRTaXplO1xuXHRcdHRoaXMuZ2FtZS5hZGQudGV4dCh0aGlzLmdhbWUud2lkdGgvMiAtIHRleHRTaXplLzMsIHRoaXMuZ2FtZS5oZWlnaHQvMyAtIGZvbnRTaXplICogNCwgJ0F1dG9tYXRhJywgc3R5bGUpO1xuXHRcdHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgncnVuJyk7XG5cdH1cblxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZWxvYWQge1xuXHRwcmVsb2FkKCkge1xuXG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0Y29uc29sZS5sb2coJ3ByZWxvYWQnKTtcblx0XHR0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ2ludHJvJyk7XG5cdH1cbn0iLCJpbXBvcnQgRmFzdGVyR2FtZU9mTGlmZSBmcm9tICcuL0Zhc3RlckdhbWVPZkxpZmUnO1xuaW1wb3J0IEFycmF5MkQgZnJvbSAnLi9BcnJheTJEJztcblxuY29uc3QgZm9udFNpemUgPSA4O1xuY29uc3Qgc3R5bGUgPSB7Zm9udDogZm9udFNpemUgKyBcInB4IG1vbm9zcGFjZVwiLCBmaWxsOiBcIiNmZmZcIn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVuIHtcblx0cHJlbG9hZCgpIHtcblxuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMuc2NyZWVuV2lkdGggPSBNYXRoLmZsb29yKHRoaXMuZ2FtZS53aWR0aCAvIGZvbnRTaXplKTtcblx0XHR0aGlzLnNjcmVlbkhlaWdodCA9IE1hdGguZmxvb3IodGhpcy5nYW1lLmhlaWdodCAvIGZvbnRTaXplKTtcblxuXHRcdHdpbmRvdy5zaW11bGF0aW9uID0gdGhpcy5zaW11bGF0aW9uID0gbmV3IEZhc3RlckdhbWVPZkxpZmUoKTtcblxuXHRcdGxldCBjeCA9IE1hdGguZmxvb3IodGhpcy5zY3JlZW5XaWR0aC8yKTtcblx0XHRsZXQgY3kgPSBNYXRoLmZsb29yKHRoaXMuc2NyZWVuSGVpZ2h0LzIpO1xuXHRcdFxuXHRcdHRoaXMuc2ltdWxhdGlvbi5hZGRBY29ybihjeCwgY3kpO1xuXG5cdFx0dGhpcy5zY3JlZW4gPSBuZXcgQXJyYXkyRCh0aGlzLnNjcmVlbldpZHRoLCB0aGlzLnNjcmVlbkhlaWdodCk7XG5cdFx0Zm9yIChsZXQgeCA9IDA7IHg8dGhpcy5zY3JlZW5XaWR0aDsgeCsrKSB7XG5cdFx0XHRmb3IgKGxldCB5ID0gMDsgeTx0aGlzLnNjcmVlbkhlaWdodDsgeSsrKSB7XG5cdFx0XHRcdHRoaXMuc2NyZWVuLnNldCh4LCB5LCB0aGlzLmdhbWUuYWRkLnRleHQoeCAqIGZvbnRTaXplLCB5ICogZm9udFNpemUsICcgJywgc3R5bGUpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLmRyYXcoKTtcblxuXHRcdGNvbnNvbGUubG9nKHNpbXVsYXRpb24pO1xuXG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cdFx0dGhpcy5zaW11bGF0aW9uLnRpY2soKTtcblx0XHR0aGlzLmRyYXcoKTtcblx0XHQvLyB0aGlzLnNpbXVsYXRpb24udGljaygpO1xuXHRcdC8vIGNvbnNvbGUubG9nKHRoaXMuc2ltdWxhdGlvbik7XG5cdFx0Ly8gdGhpcy5kcmF3KCk7XG5cdH1cblxuXHRkcmF3KCkge1xuXHRcdGxldCBpbkJvdW5kcyA9IChjZWxsKSA9PiB7XG5cdFx0XHRyZXR1cm4gY2VsbC54ID4gMCAmJiBcblx0XHRcdFx0ICAgY2VsbC54IDwgdGhpcy5zY3JlZW5XaWR0aCAmJlxuXHRcdFx0XHQgICBjZWxsLnkgPiAwICYmIFxuXHRcdFx0XHQgICBjZWxsLnkgPCB0aGlzLnNjcmVlbkhlaWdodDtcblx0XHR9XG5cblx0XHRsZXQgZGlmZiA9IHRoaXMuc2ltdWxhdGlvbi5nZXREaWZmKCk7XG5cblx0XHRkaWZmLmxpdmUuZm9yRWFjaCgoY2VsbCkgPT4ge1xuXHRcdFx0aWYgKGluQm91bmRzKGNlbGwpKSB7XG5cdFx0XHRcdHRoaXMuc2NyZWVuLmdldChjZWxsLngsIGNlbGwueSkuc2V0VGV4dCgnKicpO1xuXHRcdFx0fSBcblx0XHR9KVxuXG5cdFx0ZGlmZi5kZWFkLmZvckVhY2goKGNlbGwpID0+IHtcblx0XHRcdGlmIChpbkJvdW5kcyhjZWxsKSkge1xuXHRcdFx0XHR0aGlzLnNjcmVlbi5nZXQoY2VsbC54LCBjZWxsLnkpLnNldFRleHQoJyAnKTtcblx0XHRcdH1cblx0XHR9KVxuXG5cdH1cbn0iXX0=
