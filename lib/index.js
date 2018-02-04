(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["isometric"] = factory();
	else
		root["d3"] = root["d3"] || {}, root["d3"]["isometric"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * A handy way of generating svg's transform attribute
 */
var Transform = function() {
  /*
    A transformation is an array [a, b, c, d, e, f],
    representing the following matrix:
        a  c  e
      [ b  d  f ]
        0  0  1
  */
  var _transformation = [1, 0, 0, 1, 0, 0],
      _radDegreesConstant = Math.PI/180
    ;

  /*
    Applies the given transformation
        result        current
       a  c  e       a'  c'  e'
     [ b  d  f ] * [ b'  d'  f' ] * ....
       0  0  1       0   0   1
  */
  var pushTransform = function(newTransform) {
    _transformation = [
      _transformation[0]*newTransform[0] + _transformation[2]*newTransform[1],
      _transformation[1]*newTransform[0] + _transformation[3]*newTransform[1],
      _transformation[0]*newTransform[2] + _transformation[2]*newTransform[3],
      _transformation[1]*newTransform[2] + _transformation[3]*newTransform[3],
      _transformation[0]*newTransform[4] + _transformation[2]*newTransform[5] + _transformation[4]*1,
      _transformation[1]*newTransform[4] + _transformation[3]*newTransform[5] + _transformation[5]*1
    ];
  }

  var ret = function() {
    var transform = _transformation;
    return 'matrix(' +
              transform[0] + ',' +
              transform[1] + ',' +
              transform[2] + ',' +
              transform[3] + ',' +
              transform[4] + ',' +
              transform[5] +
            ')';
  }

  ret.rotate = function(degrees, x, y) {
    if(arguments.length > 1) ret.translate(x, y);

    pushTransform([
        Math.cos(degrees*_radDegreesConstant),
        Math.sin(degrees*_radDegreesConstant),
        -1*Math.sin(degrees*_radDegreesConstant),
        Math.cos(degrees*_radDegreesConstant),
        0,
        0]);

    if(arguments.length > 1) ret.translate(-x, -y);
    return ret;
  }

  ret.scale = function(x, y) {
    pushTransform([x, 0, 0, x, 0, 0]);
    return ret;
  }

  ret.translate = function(x, y) {
    pushTransform([1, 0, 0, 1, x, y]);
    return ret;
  }

  ret.skewX = function(x) {
    pushTransform([1, 0, Math.tan(x*_radDegreesConstant), 1, 0, 0]);
    return ret;
  }

  ret.skewY = function(y) {
    pushTransform([1, Math.tan(y*_radDegreesConstant), 0, 1, 0, 0]);
    return ret;
  }

  ret.reset = function() {
    _transformation = [1, 0, 0, 1, 0, 0];
    return ret;
  }

  return ret;
}

module.exports = Transform;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var transform = __webpack_require__(0),
  projection = __webpack_require__(2);

/**
 * The final export of the API
 */
module.exports = {
  transform: transform,
  projection: projection
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Transform = __webpack_require__(0);

var Projection = function(rotation, skewness) {
  'use strict';

  var _transform = Transform(),
    x = 0,
    y = 0,
    z = 0,
    r = rotation || 30,
    s = skewness || 30,
    reverse = false,
    position = 'x';

  var ret = function() {
    _transform.reset();//.translate(0, z);

    _transform.translate(x, y);

    if(position === 'x') {
      _transform.rotate(-r).skewX(s);
    } else if(position === 'y') {
      _transform.rotate(r).skewX(s);
    } else if(position === 'z') {
      _transform.rotate(-r).skewX(-s);
    } else {
      throw 'Invalid property for position, options are: x, y, z';
    }


    return _transform();
  };

  ret.x = function(_) {
    if(!arguments.length) return x;
    x = _;
    return ret;
  };

  ret.y = function(_) {
    if(!arguments.length) return y;
    y = _;
    return ret;
  };

  ret.z = function(_) {
    if(!arguments.length) return z;
    z = _;
    return ret;
  };

  ret.reverse = function(_) {
    if(!arguments.length) return reverse;
    reverse = _;
    return ret;
  };

  ret.position = function(_) {
    if(!arguments.length) return position;
    position = _;
    return ret;
  };

  ret.rotation = function(_) {
    if(!arguments.length) return r;
    r = _;
    return ret;
  };

  ret.skewness = function(_) {
    if(!arguments.length) return s;
    s = _;
    return ret;
  };

  return ret;
};


var XProjection = function() {
  return Projection().position('x');
};

var YProjection = function() {
  return Projection().position('y');
};

var ZProjection = function() {
  return Projection().position('z');
};

module.exports = {
  Base: Projection,
  X: XProjection,
  Y: YProjection,
  Z: ZProjection
};

/***/ })
/******/ ]);
});