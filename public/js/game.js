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

var game = new Phaser.Game(640, 480, Phaser.AUTO);

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

var GameOfLife = (function () {
	function GameOfLife(width, height) {
		_classCallCheck(this, GameOfLife);

		this.width = width;
		this.height = height;
		this.grid = new _Array2D2['default'](width, height);
		this.grid.fill(GameOfLife.DEAD);
		this.addShape(Math.floor(width / 2), Math.floor(height / 2), PENTOMINO);
	}

	_createClass(GameOfLife, [{
		key: 'update',
		value: function update() {
			console.log('tick');
			var _grid = new _Array2D2['default'](this.width, this.height);

			for (var x = 0; x < this.width; x++) {
				for (var y = 0; y < this.height; y++) {
					var c = this.grid.get(x, y);
					var n = this.neighbors(x, y);

					if (c == GameOfLife.DEAD && n == 3) {
						_grid.set(x, y, GameOfLife.LIVE);
					} else if (c == GameOfLife.LIVE && (n < 2 || n > 3)) {
						_grid.set(x, y, GameOfLife.DEAD);
					} else {
						_grid.set(x, y, c);
					}
				}
			}

			this.grid = _grid;
		}
	}, {
		key: 'neighbors',
		value: function neighbors(x, y) {
			var _this = this;

			var n = 0;

			NEIGHBORS.forEach(function (pair) {
				var _pair = _slicedToArray(pair, 2);

				var dx = _pair[0];
				var dy = _pair[1];

				if (_this.grid.get(x + dx, y + dy) == GameOfLife.LIVE) {
					n++;
				}
			});

			return n;
		}
	}, {
		key: 'addShape',
		value: function addShape(x, y, deltas) {
			var _this2 = this;

			deltas.forEach(function (pair) {
				var _pair2 = _slicedToArray(pair, 2);

				var dx = _pair2[0];
				var dy = _pair2[1];

				_this2.grid.set(x + dx, y + dy, GameOfLife.LIVE);
			});
		}
	}, {
		key: 'addPentomino',
		value: function addPentomino(x, y) {
			this.addShape(x, y, PENTOMINO);
		}
	}]);

	return GameOfLife;
})();

exports['default'] = GameOfLife;

GameOfLife.DEAD = 1;
GameOfLife.LIVE = 2;

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
			var style = { font: "32px monospace", fill: "#fff" };
			this.game.add.text(240, 200, "Automata", style);
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

var width = 640;
var height = 480;

var fontSize = 16;
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
			this.simulation = new _GameOfLife2['default'](640 / fontSize, 480 / fontSize);
			this.screen = new _Array2D2['default'](640 / fontSize, 480 / fontSize);
			this.draw();
		}
	}, {
		key: 'update',
		value: function update() {
			this.simulation.update();
			this.draw();
		}
	}, {
		key: 'draw',
		value: function draw() {
			var _this = this;

			this.simulation.grid.forEach(function (content, x, y) {
				if (content === _GameOfLife2['default'].DEAD) {
					_this.screen.get(x, y).setText(' ');
				} else {
					_this.screen.get(x, y).setText('*');
				}
			});
		}
	}]);

	return Run;
})();

exports['default'] = Run;
module.exports = exports['default'];

},{"./Array2D":1,"./GameOfLife":4}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYW5keS9Qcm9qZWN0cy9hdXRvbWF0YS9zcmMvQXJyYXkyRC5qcyIsIi9Vc2Vycy9hbmR5L1Byb2plY3RzL2F1dG9tYXRhL3NyYy9Cb290LmpzIiwiL1VzZXJzL2FuZHkvUHJvamVjdHMvYXV0b21hdGEvc3JjL0dhbWUuanMiLCIvVXNlcnMvYW5keS9Qcm9qZWN0cy9hdXRvbWF0YS9zcmMvR2FtZU9mTGlmZS5qcyIsIi9Vc2Vycy9hbmR5L1Byb2plY3RzL2F1dG9tYXRhL3NyYy9JbnRyby5qcyIsIi9Vc2Vycy9hbmR5L1Byb2plY3RzL2F1dG9tYXRhL3NyYy9QcmVsb2FkLmpzIiwiL1VzZXJzL2FuZHkvUHJvamVjdHMvYXV0b21hdGEvc3JjL1J1bi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBcUIsT0FBTztBQUNmLFdBRFEsT0FBTyxDQUNkLEtBQUssRUFBRSxNQUFNLEVBQUU7MEJBRFIsT0FBTzs7QUFFeEIsUUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsUUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsUUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUM7R0FDMUM7O2VBTGtCLE9BQU87O1dBT3ZCLGFBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNSLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztLQUN6Qzs7O1dBRVEsbUJBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3BCLFVBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUM5QixXQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3RCLGFBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDdEIsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDekM7T0FDRjtLQUNGOzs7V0FFRSxhQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFO0FBQ2hCLFVBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQzFDLGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztXQUVHLGNBQUMsT0FBTyxFQUFFOzs7QUFDWixVQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUs7QUFDeEIsY0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztPQUN6QixDQUFDLENBQUE7S0FDSDs7O1dBRU0saUJBQUMsUUFBUSxFQUFFO0FBQ2hCLFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3BDLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ25DLGtCQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbEQ7T0FDRjtLQUNGOzs7U0FyQ2tCLE9BQU87OztxQkFBUCxPQUFPOzs7Ozs7Ozs7Ozs7OztJQ0FQLElBQUk7VUFBSixJQUFJO3dCQUFKLElBQUk7OztjQUFKLElBQUk7O1NBQ2pCLG1CQUFHLEVBQ1Q7OztTQUVLLGtCQUFHO0FBQ1IsVUFBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQixPQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7R0FDakM7OztRQVBtQixJQUFJOzs7cUJBQUosSUFBSTs7Ozs7Ozs7b0JDRVIsUUFBUTs7Ozt1QkFDTCxXQUFXOzs7O3FCQUNiLFNBQVM7Ozs7bUJBQ1gsT0FBTzs7OztBQUx2QixJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBT2xELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sb0JBQU8sQ0FBQztBQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLHVCQUFVLENBQUM7QUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxxQkFBUSxDQUFDO0FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssbUJBQU0sQ0FBQztBQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJDWEwsV0FBVzs7OztBQUUvQixJQUFNLFNBQVMsR0FBRyxDQUNqQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ1IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDUCxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNQLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ1AsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDUCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDTixDQUFDOztBQUVGLElBQU0sU0FBUyxHQUFHLENBQ2pCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ1AsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDUCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUNQLENBQUM7O0lBRW1CLFVBQVU7QUFDbkIsVUFEUyxVQUFVLENBQ2xCLEtBQUssRUFBRSxNQUFNLEVBQUU7d0JBRFAsVUFBVTs7QUFFN0IsTUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsTUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsTUFBSSxDQUFDLElBQUksR0FBRyx5QkFBWSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDdkMsTUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hDLE1BQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7RUFDcEU7O2NBUG1CLFVBQVU7O1NBU3hCLGtCQUFHO0FBQ1IsVUFBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQixPQUFJLEtBQUssR0FBRyx5QkFBWSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFakQsUUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDcEMsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDckMsU0FBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzVCLFNBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUU3QixTQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDbkMsV0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtNQUNoQyxNQUVJLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLEFBQUMsRUFBRTtBQUNsRCxXQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO01BQ2hDLE1BRUk7QUFDSixXQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7TUFDbkI7S0FDRDtJQUNEOztBQUVELE9BQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0dBQ2xCOzs7U0FFUSxtQkFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFOzs7QUFDZixPQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRVYsWUFBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBSzsrQkFDWixJQUFJOztRQUFkLEVBQUU7UUFBRSxFQUFFOztBQUNYLFFBQUksTUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUU7QUFDckQsTUFBQyxFQUFFLENBQUM7S0FDSjtJQUNELENBQUMsQ0FBQzs7QUFFSCxVQUFPLENBQUMsQ0FBQztHQUNUOzs7U0FFTyxrQkFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRTs7O0FBQ3RCLFNBQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7Z0NBQ1QsSUFBSTs7UUFBZCxFQUFFO1FBQUUsRUFBRTs7QUFDWCxXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUE7R0FDRjs7O1NBRVcsc0JBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNsQixPQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7R0FDL0I7OztRQXpEbUIsVUFBVTs7O3FCQUFWLFVBQVU7O0FBNEQvQixVQUFVLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQTtBQUNuQixVQUFVLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQTs7QUFFbkIsTUFBTSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUM7Ozs7Ozs7Ozs7Ozs7O0lDcEZILEtBQUs7VUFBTCxLQUFLO3dCQUFMLEtBQUs7OztjQUFMLEtBQUs7O1NBQ2xCLG1CQUFHLEVBQ1Q7OztTQUVLLGtCQUFHO0FBQ1IsVUFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyQixPQUFJLEtBQUssR0FBRyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7QUFDcEQsT0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2hELE9BQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUM3Qjs7O1FBVG1CLEtBQUs7OztxQkFBTCxLQUFLOzs7Ozs7Ozs7Ozs7OztJQ0FMLE9BQU87VUFBUCxPQUFPO3dCQUFQLE9BQU87OztjQUFQLE9BQU87O1NBQ3BCLG1CQUFHLEVBRVQ7OztTQUVLLGtCQUFHO0FBQ1IsVUFBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN2QixPQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7R0FDL0I7OztRQVJtQixPQUFPOzs7cUJBQVAsT0FBTzs7Ozs7Ozs7Ozs7Ozs7OzswQkNBTCxjQUFjOzs7O3VCQUNqQixXQUFXOzs7O0FBRS9CLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUNsQixJQUFNLE1BQU0sR0FBRyxHQUFHLENBQUM7O0FBRW5CLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixJQUFNLEtBQUssR0FBRyxFQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsY0FBYyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQTs7SUFFeEMsR0FBRztVQUFILEdBQUc7d0JBQUgsR0FBRzs7O2NBQUgsR0FBRzs7U0FDaEIsbUJBQUcsRUFFVDs7O1NBRUssa0JBQUc7QUFDUixPQUFJLENBQUMsVUFBVSxHQUFHLDRCQUFlLEdBQUcsR0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzdELE9BQUksQ0FBQyxNQUFNLEdBQUcseUJBQVksR0FBRyxHQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEQsT0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO0dBQ1o7OztTQUdLLGtCQUFHO0FBQ1IsT0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN6QixPQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7R0FDWjs7O1NBRUcsZ0JBQUc7OztBQUNOLE9BQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFLO0FBQy9DLFFBQUksT0FBTyxLQUFLLHdCQUFXLElBQUksRUFBRTtBQUNoQyxXQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNuQyxNQUFNO0FBQ04sV0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbkM7SUFDRCxDQUFDLENBQUE7R0FFRjs7O1FBMUJtQixHQUFHOzs7cUJBQUgsR0FBRyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcnJheTJEIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmNvbnRlbnQgPSBuZXcgQXJyYXkod2lkdGggKiBoZWlnaHQpO1xuICB9XG5cbiAgZ2V0KHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50W3kgKiB0aGlzLndpZHRoICsgeF07XG4gIH1cblxuICBnZXRTcXVhcmUoeCwgeSwgdywgaCkge1xuICAgIGxldCBzcXVhcmUgPSBuZXcgQXJyYXkyRCh3LCBoKVxuICAgIGZvciAobGV0IGk9MDsgaTx3OyBpKyspIHtcbiAgICAgIGZvciAobGV0IGo9MDsgajxoOyBqKyspIHtcbiAgICAgICAgc3F1YXJlLnNldChpLCBqLCB0aGlzLmdldCh4ICsgaSwgeSArIGopKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldCh4LCB5LCBuZXdWYWwpIHtcbiAgICB0aGlzLmNvbnRlbnRbeSAqIHRoaXMud2lkdGggKyB4XSA9IG5ld1ZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGZpbGwoY29udGVudCkge1xuICAgIHRoaXMuZm9yRWFjaCgoXywgeCwgeSkgPT4ge1xuICAgICAgdGhpcy5zZXQoeCwgeSwgY29udGVudCk7XG4gICAgfSlcbiAgfVxuXG4gIGZvckVhY2goY2FsbGJhY2spIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy53aWR0aDsgeCsrKSB7XG4gICAgICAgIGNhbGxiYWNrKHRoaXMuY29udGVudFt5ICogdGhpcy53aWR0aCArIHhdLCB4LCB5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCb290IHtcblx0cHJlbG9hZCgpIHtcblx0fVxuXG5cdGNyZWF0ZSgpIHtcblx0XHRjb25zb2xlLmxvZygnYm9vdCcpO1xuXHRcdHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgncHJlbG9hZCcpO1xuXHR9XG5cbn0iLCJsZXQgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSg2NDAsIDQ4MCwgUGhhc2VyLkFVVE8pO1xuXG5pbXBvcnQgQm9vdCBmcm9tICcuL0Jvb3QnO1xuaW1wb3J0IFByZWxvYWQgZnJvbSAnLi9QcmVsb2FkJztcbmltcG9ydCBJbnRybyBmcm9tICcuL0ludHJvJztcbmltcG9ydCBSdW4gZnJvbSAnLi9SdW4nO1xuXG5nYW1lLnN0YXRlLmFkZCgnYm9vdCcsIEJvb3QpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3ByZWxvYWQnLCBQcmVsb2FkKTtcbmdhbWUuc3RhdGUuYWRkKCdpbnRybycsIEludHJvKTtcbmdhbWUuc3RhdGUuYWRkKCdydW4nLCBSdW4pO1xuZ2FtZS5zdGF0ZS5zdGFydCgnYm9vdCcpOyIsImltcG9ydCBBcnJheTJEIGZyb20gJy4vQXJyYXkyRCc7XG5cbmNvbnN0IE5FSUdIQk9SUyA9IFtcblx0Wy0xLCAtMV0sXG5cdFstMSwgMF0sXG5cdFstMSwgMV0sXG5cdFswLCAtMV0sXG5cdFswLCAxXSxcblx0WzEsIC0xXSxcblx0WzEsIDBdLFxuXHRbMSwgMV1cbl07XG5cbmNvbnN0IFBFTlRPTUlOTyA9IFtcblx0Wy0xLCAwXSxcblx0WzAsIDBdLFxuXHRbMCwgMV0sXG5cdFswLCAtMV0sXG5cdFsxLCAtMV1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVPZkxpZmUge1xuXHRjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMuZ3JpZCA9IG5ldyBBcnJheTJEKHdpZHRoLCBoZWlnaHQpO1xuXHRcdHRoaXMuZ3JpZC5maWxsKEdhbWVPZkxpZmUuREVBRCk7XG5cdFx0dGhpcy5hZGRTaGFwZShNYXRoLmZsb29yKHdpZHRoLzIpLCBNYXRoLmZsb29yKGhlaWdodC8yKSwgUEVOVE9NSU5PKTtcblx0fSBcblxuXHR1cGRhdGUoKSB7XG5cdFx0Y29uc29sZS5sb2coJ3RpY2snKTtcblx0XHR2YXIgX2dyaWQgPSBuZXcgQXJyYXkyRCh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cblx0XHRmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuXHRcdFx0Zm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG5cdFx0XHRcdGxldCBjID0gdGhpcy5ncmlkLmdldCh4LCB5KTtcblx0XHRcdFx0bGV0IG4gPSB0aGlzLm5laWdoYm9ycyh4LCB5KTtcblxuXHRcdFx0XHRpZiAoYyA9PSBHYW1lT2ZMaWZlLkRFQUQgJiYgbiA9PSAzKSB7XG5cdFx0XHRcdFx0X2dyaWQuc2V0KHgsIHksIEdhbWVPZkxpZmUuTElWRSlcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsc2UgaWYgKGMgPT0gR2FtZU9mTGlmZS5MSVZFICYmIChuIDwgMiB8fCBuID4gMykpIHtcblx0XHRcdFx0XHRfZ3JpZC5zZXQoeCwgeSwgR2FtZU9mTGlmZS5ERUFEKVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0X2dyaWQuc2V0KHgsIHksIGMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5ncmlkID0gX2dyaWQ7XG5cdH1cblxuXHRuZWlnaGJvcnMoeCwgeSkge1xuXHRcdGxldCBuID0gMDtcblxuXHRcdE5FSUdIQk9SUy5mb3JFYWNoKChwYWlyKSA9PiB7XG5cdFx0XHRsZXQgW2R4LCBkeV0gPSBwYWlyO1xuXHRcdFx0aWYgKHRoaXMuZ3JpZC5nZXQoeCArIGR4LCB5ICsgZHkpID09IEdhbWVPZkxpZmUuTElWRSkge1xuXHRcdFx0XHRuKys7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gbjtcblx0fVxuXG5cdGFkZFNoYXBlKHgsIHksIGRlbHRhcykge1xuXHRcdGRlbHRhcy5mb3JFYWNoKChwYWlyKSA9PiB7XG5cdFx0XHRsZXQgW2R4LCBkeV0gPSBwYWlyO1xuXHRcdFx0dGhpcy5ncmlkLnNldCh4K2R4LCB5K2R5LCBHYW1lT2ZMaWZlLkxJVkUpO1xuXHRcdH0pXG5cdH0gXG5cblx0YWRkUGVudG9taW5vKHgsIHkpIHtcblx0XHR0aGlzLmFkZFNoYXBlKHgsIHksIFBFTlRPTUlOTyk7XG5cdH1cbn1cblxuR2FtZU9mTGlmZS5ERUFEID0gMVxuR2FtZU9mTGlmZS5MSVZFID0gMlxuXG53aW5kb3cuR09MID0gR2FtZU9mTGlmZTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRybyB7XG5cdHByZWxvYWQoKSB7XG5cdH1cblxuXHRjcmVhdGUoKSB7XG5cdFx0Y29uc29sZS5sb2coJ2ludHJvJyk7XG5cdFx0bGV0IHN0eWxlID0geyBmb250OiBcIjMycHggbW9ub3NwYWNlXCIsIGZpbGw6IFwiI2ZmZlwifTtcblx0XHR0aGlzLmdhbWUuYWRkLnRleHQoMjQwLCAyMDAsICdBdXRvbWF0YScsIHN0eWxlKTtcblx0XHR0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ3J1bicpO1xuXHR9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkIHtcblx0cHJlbG9hZCgpIHtcblxuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdGNvbnNvbGUubG9nKCdwcmVsb2FkJyk7XG5cdFx0dGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdpbnRybycpO1xuXHR9XG59IiwiaW1wb3J0IEdhbWVPZkxpZmUgZnJvbSAnLi9HYW1lT2ZMaWZlJztcbmltcG9ydCBBcnJheTJEIGZyb20gJy4vQXJyYXkyRCc7XG5cbmNvbnN0IHdpZHRoID0gNjQwO1xuY29uc3QgaGVpZ2h0ID0gNDgwO1xuXG5jb25zdCBmb250U2l6ZSA9IDE2O1xuY29uc3Qgc3R5bGUgPSB7Zm9udDogZm9udFNpemUgKyBcInB4IG1vbm9zcGFjZVwiLCBmaWxsOiBcIiNmZmZcIn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVuIHtcblx0cHJlbG9hZCgpIHtcblxuXHR9XG5cblx0Y3JlYXRlKCkge1xuXHRcdHRoaXMuc2ltdWxhdGlvbiA9IG5ldyBHYW1lT2ZMaWZlKDY0MC9mb250U2l6ZSwgNDgwL2ZvbnRTaXplKTtcblx0XHR0aGlzLnNjcmVlbiA9IG5ldyBBcnJheTJEKDY0MC9mb250U2l6ZSwgNDgwL2ZvbnRTaXplKTtcblx0XHR0aGlzLmRyYXcoKTtcblx0fVxuXG5cblx0dXBkYXRlKCkge1xuXHRcdHRoaXMuc2ltdWxhdGlvbi51cGRhdGUoKTtcblx0XHR0aGlzLmRyYXcoKTtcblx0fVxuXG5cdGRyYXcoKSB7XG5cdFx0dGhpcy5zaW11bGF0aW9uLmdyaWQuZm9yRWFjaCgoY29udGVudCwgeCwgeSkgPT4ge1xuXHRcdFx0aWYgKGNvbnRlbnQgPT09IEdhbWVPZkxpZmUuREVBRCkge1xuXHRcdFx0XHR0aGlzLnNjcmVlbi5nZXQoeCwgeSkuc2V0VGV4dCgnICcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zY3JlZW4uZ2V0KHgsIHkpLnNldFRleHQoJyonKTtcblx0XHRcdH1cblx0XHR9KVxuXHRcdFxuXHR9XG59Il19
