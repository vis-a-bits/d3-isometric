var Transform = require('./transform');

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