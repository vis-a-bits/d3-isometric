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
    position = 'floor';

  var ret = function() {
    _transform.reset();//.translate(0, z);

    _transform.translate(x, y);

    if(position === 'floor') {
      _transform.rotate(-r).skewX(s);
    } else if(position === 'leftWall') {
      _transform.rotate(r).skewX(s);
    } else if(position === 'rightWall') {
      _transform.rotate(-r).skewX(-s);
    } else {
      throw 'Invalid property for position, options are: floor, leftWall, rightWall';
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


var FloorProjection = function() {
  return Projection().position('floor');
};

var LeftWallProjection = function() {
  return Projection().position('leftWall');
};

var RightWallProjection = function() {
  return Projection().position('rightWall');
};

module.exports = {
  Base: Projection,
  Floor: FloorProjection,
  LeftWall: LeftWallProjection,
  RightWall: RightWallProjection
};